# n8n Workflow Setup for DLR Digital Tap

This guide explains how to set up automated social media posts using n8n to share campaign statistics monthly on Twitter and LinkedIn.

## Prerequisites

- n8n account (cloud or self-hosted)
- Twitter Developer Account with API access
- LinkedIn Page or Personal Profile with API access
- Admin API key configured in your environment variables

## Overview

The workflow will:
1. **Trigger monthly** (first day of each month)
2. **Fetch campaign stats** from `/api/stats` endpoint
3. **Generate social media post** with current statistics
4. **Post to Twitter** (X) automatically
5. **Post to LinkedIn** automatically

## Step 1: Environment Variables

Add these to your `.env` file:

```env
ADMIN_API_KEY=your_secret_api_key_for_n8n
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_admin_password
```

**Important:** Use a strong, random API key. You can generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 2: Import n8n Workflow

1. Log in to your n8n account
2. Go to **Workflows** → **Import from File**
3. Import the `n8n-dlr-campaign-workflow.json` file from this directory
4. The workflow will be created with all nodes configured

## Step 3: Configure Credentials

### Twitter/X Credentials

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app or use existing one
3. Generate API keys and tokens with **Read and Write** permissions
4. In n8n, add **Twitter** credentials:
   - API Key (Consumer Key)
   - API Secret (Consumer Secret)
   - Access Token
   - Access Token Secret

### LinkedIn Credentials

1. Create a LinkedIn App at [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Request **r_liteprofile** and **w_member_social** permissions
3. In n8n, add **LinkedIn** credentials:
   - Client ID
   - Client Secret
   - Access Token (OAuth2)

### HTTP Request Credentials

1. In n8n, add **Header Auth** credentials:
   - Name: `Authorization`
   - Value: `Bearer YOUR_ADMIN_API_KEY`
   - Replace `YOUR_ADMIN_API_KEY` with your actual key from `.env`

## Step 4: Update Workflow Configuration

1. **Schedule Node**: Set to run monthly (default: 1st of month at 9:00 AM)
2. **HTTP Request Node**: Update URL if needed
   - Default: `https://dlrdigitaltap.netlify.app/api/stats`
   - Update to your production domain
3. **Set Node**: Verify post template formatting
4. **Twitter Node**: Select your Twitter credentials
5. **LinkedIn Node**: Select your LinkedIn credentials

## Step 5: Test the Workflow

1. Click **Execute Workflow** in n8n
2. Check each node for successful execution
3. Verify the post appears on Twitter/LinkedIn
4. Review statistics formatting

## Workflow Structure

```
┌─────────────────┐
│  Schedule       │ Trigger on 1st of month, 9:00 AM
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  HTTP Request   │ GET /api/stats with Bearer token
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Set Variables  │ Format statistics into post content
└────────┬────────┘
         │
         ├──────────────────┐
         ▼                  ▼
┌─────────────────┐  ┌─────────────────┐
│  Post to Twitter│  │ Post to LinkedIn│
└─────────────────┘  └─────────────────┘
```

## Post Template

The workflow generates posts like:

```
🚇 DLR Digital Tap Campaign Update

📊 1,458 people have voted for contactless, queue-free travel on the DLR!

💬 127 comments from frustrated commuters sharing their experiences with 
broken tap points, rush hour queues, and missed trains.

🎯 Day 308 of our ongoing campaign to bring modern travel technology to the DLR.

Every voice matters. Join the movement: https://dlrdigitaltap.netlify.app

@TfL @MayorofLondon #DLR #London #PublicTransport #Innovation
```

## Customisation Options

### Change Posting Frequency

Edit the **Schedule** node:
- **Weekly**: Every Monday at 9:00 AM
- **Bi-weekly**: 1st and 15th of month
- **Monthly**: 1st of month (default)
- **Custom**: Use cron expression

### Modify Post Content

Edit the **Set** node to customise:
- Emojis and formatting
- Hashtags
- Mentions (@TfL, @MayorofLondon)
- Call-to-action text
- Website URL

### Add More Platforms

You can add nodes for:
- **Mastodon**: Use HTTP Request with Mastodon API
- **Facebook**: Use Facebook Graph API node
- **Instagram**: Use Facebook Graph API node
- **Email Newsletter**: Use email node to send to subscribers

## Monitoring and Maintenance

### Check Workflow Execution

1. Go to **Executions** in n8n
2. View history of workflow runs
3. Debug any failed executions
4. Monitor API rate limits

### Update Statistics Display

The admin dashboard (`/admin`) provides:
- Real-time statistics
- Preview of social media content
- Copy-to-clipboard functionality
- Manual refresh option

### API Endpoint Security

The `/api/stats` endpoint is protected:
- Requires `Authorization: Bearer TOKEN` header
- Returns 401 Unauthorised without valid token
- Rate limiting recommended for production

## Troubleshooting

### Error: "Unauthorised" (401)

- Check `ADMIN_API_KEY` is set in environment variables
- Verify Bearer token in n8n HTTP Request headers
- Ensure token matches exactly (no extra spaces)

### Error: "Failed to fetch stats" (500)

- Check Supabase connection is working
- Verify database actions are functioning
- Review server logs for details

### Posts not appearing

- Verify Twitter/LinkedIn credentials are valid
- Check API rate limits haven't been exceeded
- Ensure OAuth tokens haven't expired
- Review n8n execution logs

## Best Practices

1. **Test First**: Always test with a single manual execution before enabling schedule
2. **Monitor Limits**: Be aware of Twitter/LinkedIn API rate limits
3. **Backup Credentials**: Store credentials securely in password manager
4. **Review Posts**: Check post formatting before automating
5. **Update URLs**: Keep website URLs current if domain changes
6. **Rotate Keys**: Periodically rotate API keys for security

## Alternative: Manual Posting

If you prefer manual control:
1. Visit `/admin` dashboard
2. Click "Copy to Clipboard"
3. Manually post to Twitter/LinkedIn
4. More control, no automation needed

## Support

For n8n-specific issues:
- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community](https://community.n8n.io/)
- [n8n Templates](https://n8n.io/workflows/)

For DLR Digital Tap issues:
- Use the contact form on the website
- Check GitHub repository for updates
