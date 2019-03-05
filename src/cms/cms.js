import CMS from 'netlify-cms'

import BlogPostPreview from './preview-templates/BlogPostPreview'
import EventPostPreview from './preview-templates/EventPostPreview'
import PagePreview from './preview-templates/PagePreview';

CMS.registerPreviewTemplate('aktuelt', BlogPostPreview)
CMS.registerPreviewTemplate('events', EventPostPreview)
CMS.registerPreviewTemplate('subpage', PagePreview)
