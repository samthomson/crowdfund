const routes = require('next-routes')()

routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:campaignAddress', '/campaigns/showCampaign')
    .add('/campaigns/:campaignAddress/requests', '/campaigns/requests/index')
    .add('/campaigns/:campaignAddress/requests/new', '/campaigns/requests/new')

module.exports = routes