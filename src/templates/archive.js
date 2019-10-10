import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import NewsItem from '../components/lists/Newsitem'
import Pagination from '../components/lists/Pagination'

const archiveUrl = (index) => {
  if (index === 0) {
    return '/arkiv';
  }
  return `/arkiv/${index+1}`;
}
export default class ArchiveList extends React.Component {
  render() {
    const {pageContext, data} = this.props;
    const posts = data.allMarkdownRemark.edges;

    const title = `Aktuelt arkiv side ${pageContext.currentPage}`;

    return (
      <Layout>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <section className="container band">
          <h1>{title}</h1>
          <div className="row row--min-gutter">
            <ul className="no-list">
            {posts.map(({ node: post }) => (
              <NewsItem key={post.id}
                        title={post.frontmatter.title}
                        date={post.frontmatter.date}
                        slug={post.fields.slug}
                        excerpt={post.excerpt} />
            ))}
            </ul>
          </div>
          {pageContext.numPages > 1 && <Pagination selected={pageContext.currentPage} pages={pageContext.numPages}
              current={pageContext.currentPage}
              urlFunc={archiveUrl}/> }
        </section>
      </Layout>
    )
  }
}

export const archiveListQuery = graphql`
  query archiveListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "aktuelt-post" } }}
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 80)
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`