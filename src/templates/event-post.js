import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { HTMLContent } from '../components/Content'
import { BlogPostTemplate, BlogLayout } from './aktuelt-post';

const EventPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <BlogLayout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        location={post.frontmatter.location}
        date={post.frontmatter.eventdate}
        image={post.frontmatter.image}
        helmet={
          <Helmet
          titleTemplate="%s | Nyheter"
          >
            <title>{post.frontmatter.title}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
            <meta property="og:title" content={`${post.frontmatter.title}`}></meta>
            <meta property="og:image" content={`${post.frontmatter.image.childImageSharp.fixed.src}`}></meta>
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
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
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        eventdate(formatString: "MMMM DD, YYYY")
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
    }
  }
`
