import React from 'react'
import get from 'lodash.get';
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SideMenu from '../components/SideMenu'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  location,
  date,
  image,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  console.log('image', image);
  return (
    <section className="section">
      {helmet || ''}
      <div className="article">
        <h1 className="article--title">
          {title}
        </h1>
        <div className="small article--date">{date}{location ? ` - ${location}` : null}</div>

        {image && <PreviewCompatibleImage imageInfo={image} />}
        {description && (<p className="ingress">{description}</p>)}
        <PostContent content={content} />
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  image: PropTypes.object,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

export const BlogLayout = ({children, list, listTitle}) => {
  return <Layout>
    <img className="banner--post" alt="" role="presentation" src="/assets/banner.svg"/>
    <div className="container">
      <div className="row">
        <div className="col-9 col-md-12">
          {children}
        </div>
        <div className="col-3 col-md-12">
          {list && <SideMenu list={list} title={listTitle}/> }
        </div>
      </div>
    </div>
  </Layout>
}

const BlogPost = ({ data }) => {
  const { post, posts } = data
  const edges = posts && posts.edges ? posts.edges : [];
  const image = get(post, 'frontmatter.image.childImageSharp.fixed.src');
  return (
    <BlogLayout list={edges.map(item => item.node)}>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
        date={post.frontmatter.date}
        helmet={
          <Helmet
          titleTemplate="%s | Nyheter"
          >
            <title>{post.frontmatter.title}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
            <meta property="og:title" content={`${post.frontmatter.title}`}></meta>
            {image && <meta property="og:image" content={image}></meta> }
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        />
    </BlogLayout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.object,
    posts: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    post:markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
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
        description
        tags
      }
    },
    posts: allMarkdownRemark(
      limit: 3,
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "aktuelt-post" } }, id: {ne: $id}}
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
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
