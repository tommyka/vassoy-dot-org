import React from 'react'
import Content, { HTMLContent } from '../components/Content'
import PropTypes from 'prop-types'
import { BlogLayout } from './aktuelt-post';
import Helmet from 'react-helmet';

export const PageTemplate = ({title, content, contentComponent}) => {
  const PostContent = contentComponent || Content
  return <div className="article">
      <h1>{title}</h1>
      <PostContent content={content} />
    </div>
}
PageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string
}

const page = ({data}) => {
  const title = data.page.frontmatter.title;
  return <BlogLayout>
    <Helmet title={`${title} - Vassoy.org`}>
    </Helmet>
        <PageTemplate
          contentComponent={HTMLContent}
          title={title}
          content={data.page.html}/>
    </BlogLayout>
}

export default page;

export const pageQuery = graphql`
query PagePostByID($id: String!) {
  page:markdownRemark(id: { eq: $id }) {
    id
    html
    frontmatter {
      title
    }
  }
}
`
