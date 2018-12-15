const routes = require('next-routes')()

routes.add('/campaigns/new', '/campaigns/new')
routes.add('/campaigns/:campaignAddress', '/campaigns/showCampaign')

module.exports = routes