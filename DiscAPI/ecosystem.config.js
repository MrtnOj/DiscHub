module.exports = {
    apps: [{
      name: 'discapp',
      script: './server.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-3-15-42-245.us-east-2.compute.amazonaws.com',
        key: '~/.ssh/Discapp.pem',
        ref: 'origin/master',
        repo: 'git@github.com:MrtnOj/DiscHub.git',
        path: '/home/ubuntu/DiscApp/',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }