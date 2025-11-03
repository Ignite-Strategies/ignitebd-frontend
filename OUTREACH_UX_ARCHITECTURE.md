# Outreach UX Architecture

## Overview

The Outreach system is the core engagement engine for personalized email campaigns. It integrates with **Contact Lists** and **Templates** to enable efficient, scalable business development outreach.

---

## Core Components

### 1. **OutreachHome** (`/outreach`)
**Entry Point** - The main dashboard for all outreach activities

**Features:**
- Campaign overview metrics (total, active, recipients, response rate)
- Quick actions: Contact Lists, Templates, Analytics, Individual Email
- Draft campaigns management
- Sent campaigns tracking
- Launch point for creating new campaigns

**Routes to:**
- `/outreach/campaign-creator` - Create new campaign
- `/outreach/analytics` - View campaign performance
- `/outreach/templates` - Manage email templates
- `/outreach/individual-email` - Send 1:1 personal emails
- `/contact-list-manager` - Manage contact lists

---

### 2. **CampaignCreator** (`/outreach/campaign-creator`)
**Campaign Builder** - Multi-step flow to create personalized email campaigns

**Flow:**
1. **Campaign Details**: Name, description
2. **Contact List Selection**: Choose from existing lists or create new
3. **Email Content**: Subject, message body with variable support
4. **Attachments**: Optional file attachments
5. **Preview & Send**: Review before sending

**Dependencies:**
- **Contact Lists**: Campaign requires a contact list to send to
- **Templates**: Can load template content to start from
- Variable support: `{{firstName}}`, `{{lastName}}`, `{{company}}`, `{{bookMeetingLink}}`, `{{yourName}}`

**Routes to:**
- `/outreach/campaign-preview` - Review campaign before sending
- `/contact-list-manager` - Create/manage contact lists
- `/outreach/templates` - Browse templates

---

### 3. **CampaignPreview** (`/outreach/campaign-preview`)
**Pre-Send Review** - Final check before sending campaign

**Features:**
- Preview email as it will appear to recipients
- Review contact list details
- Final confirmation before sending
- Edit capability to go back

**Routes to:**
- `/outreach/campaign-success` - After successful send
- `/outreach/campaign-creator` - Back to edit

---

### 4. **CampaignSuccess** (`/outreach/campaign-success`)
**Post-Send Confirmation** - Campaign sent successfully

**Features:**
- Confirmation of campaign send
- Next steps: analytics, new campaign, manage lists
- Links to track performance

**Routes to:**
- `/outreach/analytics` - View campaign results
- `/outreach/campaign-creator` - Create another campaign
- `/contact-list-manager` - Manage lists

---

### 5. **CampaignAnalytics** (`/outreach/analytics`)
**Performance Tracking** - Analyze campaign results

**Features:**
- Open rates
- Click rates
- Response rates
- Engagement metrics
- Individual recipient tracking

**Data Sources:**
- Campaign send records
- Email tracking (opens, clicks)
- Reply tracking

---

### 6. **Templates** (`/outreach/templates`)
**Email Template Library** - Reusable email templates

**Features:**
- Browse template library
- Create new templates
- Edit existing templates
- Preview templates
- Variable support

**Template Variables:**
- `{{firstName}}` - Contact's first name
- `{{lastName}}` - Contact's last name  
- `{{company}}` - Contact's company
- `{{bookMeetingLink}}` - Personalized meeting booking link
- `{{yourName}}` - Sender's name

**Routes to:**
- `/outreach/templates/:templateId` - View/edit specific template
- `/outreach/campaign-creator` - Use template to create campaign

---

### 7. **TemplateView** (`/outreach/templates/:templateId`)
**Template Editor** - View and edit individual templates

**Features:**
- Template preview
- Edit template content
- Save changes
- Use template in new campaign

---

### 8. **IndividualEmail** (`/outreach/individual-email`)
**1:1 Personal Email** - Send personalized emails manually

**Features:**
- Send to single contact
- Full email editor
- Template support
- No campaign tracking (personal outreach)

**Use Cases:**
- Follow-up after meeting
- Personal introduction
- Warm relationship building

---

## Integration Points

### Contact Lists System

**Location:** `/contact-list-manager` (in contacts folder)

**Connection:**
- Campaigns **require** a contact list to send to
- Contact lists are created/managed separately
- Lists contain contacts with: name, email, company, custom fields
- Lists can be segmented by: persona, ecosystem role, status, tags

**Flow:**
1. Create/manage lists in Contact List Manager
2. Select list when creating campaign
3. Campaign sends to all contacts in selected list
4. Recipients tracked per campaign

---

### Templates System

**Location:** `/outreach/templates`

**Connection:**
- Templates provide starting point for campaign content
- Templates support variables for personalization
- Can create templates from scratch or modify existing
- Templates saved for reuse across campaigns

**Flow:**
1. Browse templates or create new
2. Load template into CampaignCreator
3. Customize for specific campaign
4. Save customized version as new template (optional)

---

## Data Flow

```
Contact Lists → CampaignCreator → CampaignPreview → CampaignSuccess
                                              ↓
                                         CampaignAnalytics
                                              
Templates → CampaignCreator (optional starting point)
```

## Key Features

### Personalization
- Variable replacement: `{{firstName}}`, `{{company}}`, etc.
- Per-contact customization within campaign
- Template-driven consistency

### Scalability
- Send to multiple contact lists
- Track performance at campaign and recipient level
- Reusable templates reduce setup time

### Analytics
- Campaign-level metrics
- Individual recipient tracking
- Response rate calculation
- Performance optimization insights

## Routes Summary

- `/outreach` - OutreachHome (main dashboard)
- `/outreach/campaign-creator` - Create campaign
- `/outreach/campaign-preview` - Preview before send
- `/outreach/campaign-success` - Send confirmation
- `/outreach/analytics` - Campaign performance
- `/outreach/templates` - Template library
- `/outreach/templates/:templateId` - View/edit template
- `/outreach/individual-email` - Send 1:1 email

## Dependencies

1. **Contact Lists** (`/contact-list-manager`)
   - Required for campaigns
   - Manages recipient groups

2. **Templates** (`/outreach/templates`)
   - Optional but recommended
   - Speeds up campaign creation

3. **Contacts System** (`/contacts`)
   - Contact data source
   - Individual contact management

4. **Personas** (`/personas`)
   - Can inform template selection
   - Guides targeting strategy

## Future Enhancements

- A/B testing for subject lines
- Scheduled sends
- Automated follow-up sequences
- Integration with calendar for meeting booking links
- Advanced segmentation
- Performance scoring for templates

