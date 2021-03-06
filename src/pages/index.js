import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import NewsItem from '../components/lists/Newsitem';
import { Today } from '../services/date/timecode';


export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const page = data.page;
    const { edges: news } = data.news
    const { edges: events } = data.events

    const today = Today();

    const newEvents = events.filter(({node:post}) => {
      return post.frontmatter.timecode > today
    });

    return (
      <Layout>
        {page.frontmatter.banner && <PreviewCompatibleImage imageInfo={page.frontmatter.banner}/> }
        <main>
          <section className="band bg-secondary">
            <div className="container">
              <div className="row">

                <div className="col-8">
                  <h1>{page.frontmatter.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: page.html }}>
                  </div>
                </div>
                {false && <div className="col-4">
                  <h2>Facts om øya</h2>
                  <p dangerouslySetInnerHTML={{ __html: page.frontmatter.fact.replace(/\n/g, '<br>') }}></p>
                </div>}
              </div>
            </div>
          </section>
          <section className="container band">
            <div className="row row--min-gutter">
              <div className="col-6">
                <h2 className="align-center">Aktuelt</h2>
                { news && (<ul className="no-list">
                  {news.map(({node: post}) => (
                    <NewsItem key={post.id}
                              title={post.frontmatter.title}
                              image={post.frontmatter.image}
                              date={post.frontmatter.date}
                              slug={post.fields.slug}
                              excerpt={post.frontmatter.description} />
                  ))}
                </ul>)}
                <Link className="bg-secondary list-item archive-link" to="/arkiv">Se alle nyheter</Link>
              </div>

              <div className="col-6">
                <h2 className="align-center">Hva skjer?</h2>
                <ul className="no-list">
                  {newEvents.map(({node: post}) => {
                    const dateSplit = post.frontmatter.eventdate.split(':');

                    return (
                    <li className="bg-secondary list-item" key={post.id}>
                    <article className="flex">
                      <div className="event--timeanddate align-center">
                        <div className="event--date">{dateSplit[1]}</div>
                        <div className="event--month">{dateSplit[0]}</div>
                      </div>
                      <div className="grow">
                        <Link to={post.fields.slug}>
                          <h3>{post.frontmatter.title}</h3>
                        </Link>
                        <div className="info small flex">
                          <div className="event--info-item">{post.frontmatter.location}</div>
                          <div className="event--info-item">{dateSplit[2]}:{dateSplit[3]}</div>
                        </div>
                      </div>
                    </article>
                  </li>);}
                  )}
                </ul>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      edges: PropTypes.array,
    }),
    news: PropTypes.shape({
      edges: PropTypes.array,
    }),
    events: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    page:markdownRemark(frontmatter: {templateKey: {eq: "index"} }){
      id
      html
      frontmatter {
        title,
        fact,
        banner {
          childImageSharp {
            fluid(maxWidth: 1400, maxHeight: 300, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
  	},
    news:allMarkdownRemark(
      limit: 3,
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "aktuelt-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 80)
          id
          fields {
            slug
          }
          frontmatter {
            title,
            description,
            image {
              childImageSharp {
                fluid(maxWidth: 120, maxHeight: 120, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    },
    events:allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "event-post" } }}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            eventdate(formatString: "MMMM:DD:HH:mm")
            timecode:eventdate(formatString: "YYYYMMDD")
            location
          }
        }
      }
    }
  }
`
