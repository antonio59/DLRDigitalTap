# Automation Workflows

This directory contains automation workflow configurations for the DLR Digital Tap campaign.

## Available Workflows

### n8n-dlr-campaign-workflow.json

**Purpose:** Automatically post monthly campaign updates to Twitter and LinkedIn

**What it does:**
- Fetches campaign statistics from `/api/stats`
- Generates formatted social media post
- Posts to Twitter and LinkedIn simultaneously
- Runs on the 1st of every month at 9:00 AM GMT

**Setup:** See [`docs/N8N_WORKFLOW_SETUP.md`](../docs/N8N_WORKFLOW_SETUP.md) for complete instructions

## Quick Start

1. Import `n8n-dlr-campaign-workflow.json` into your n8n instance
2. Configure credentials for Twitter and LinkedIn
3. Set up HTTP Header Auth with your `ADMIN_API_KEY`
4. Update the API endpoint URL if needed
5. Test the workflow manually
6. Enable the schedule

## Files in This Directory

- `n8n-dlr-campaign-workflow.json` - Complete n8n workflow configuration
- `README.md` - This file

## Related Documentation

- [n8n Workflow Setup Guide](../docs/N8N_WORKFLOW_SETUP.md)
- Admin Dashboard: `/admin`
- API Endpoint: `/api/stats`

## Customisation

You can modify:
- Posting frequency (schedule cron expression)
- Post content template
- Target social media platforms
- Statistics included in posts

See the setup guide for detailed customisation instructions.
