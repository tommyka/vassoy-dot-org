import React from 'react'
import get from 'lodash.get';
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { HTMLContent } from '../components/Content'
import { BlogPostTemplate, BlogLayout } from './aktuelt-post';
import { Today } from '../services/date/timecode';

const EventPost = ({ data }) => {
  const { event, events } = data
  const edges = events && events.edges ? events.edges : [];
  const image = get(event, 'frontmatter.image.childImageSharp.fixed.src');

  const today = Today();

  const items = edges.filter(({node:post}) => {
    return post.frontmatter.timecode > today
  });
  return (
    <BlogLayout list={items.map(item => item.node)} listTitle="Andre arrengementer">
      <BlogPostTemplate
        content={event.html}
        contentComponent={HTMLContent}
        description={event.frontmatter.description}
        location={event.frontmatter.location}
        date={event.frontmatter.eventdate}
        image={event.frontmatter.image}
        helmet={
          <Helmet
          titleTemplate="%s | Nyheter"
          >
            <title>{event.frontmatter.title}</title>
            <meta name="description" content={`${event.frontmatter.description}`} />
            <meta property="og:title" content={`${event.frontmatter.title}`}></meta>
            <meta property="og:type" content="event"></meta>
            <meta property="og:event.date" content={event.frontmatter.facebookdate}></meta>
            {image && <meta property="og:image" content={image}></meta>}
          </Helmet>
        }
        tags={event.frontmatter.tags}
        title={event.frontmatter.title}
        />
    </BlogLayout>
  )
}

EventPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default EventPost

export const pageQuery = graphql`
  query EventPostByID($id: String!) {
    event:markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        eventdate(formatString: "MMMM DD, YYYY - HH:mm")
        facebookdate:eventdate(formatString: "YYYY-MM-DD")
        title
        description
        location
        image {
          childImageSharp {
            fluid(maxWidth: 1024, quality: 90) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 400) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    },
    events: allMarkdownRemark(
      limit: 3,
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "event-post" } }, id: {ne: $id}}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title,
            templateKey
            timecode:eventdate(formatString: "YYYYMMDD")
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
