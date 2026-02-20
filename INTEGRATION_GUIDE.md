# CivicEye: Integration Guide

This guide explains how to connect your Supabase Storage bucket and n8n production workflow to the application.

## 1. Connecting Supabase Storage (Buckets)

The code is pre-configured to look for a bucket named `complaints-media`. To connect it:

1.  **Create the Bucket**:
    - Go to your [Supabase Dashboard](https://app.supabase.com).
    - Navigate to **Storage** > **Buckets**.
    - Click **New Bucket** and name it `complaints-media`.
2.  **Make it Public**:
    - Ensure the bucket toggle is set to **Public** so that images can be viewed in the dashboards via public URLs.
3.  **Configure Policies (Permissions)**:
    - Click on the `complaints-media` bucket.
    - Go to **Policies** (or access control).
    - Create a new policy: **"Allow all users to upload"** (or restrict to authenticated users if you have auth set up).
    - Give `INSERT` and `SELECT` permissions to `Anon` or `Authenticated` roles.

---

## 2. Connecting n8n for Email Automation

The application can trigger n8n workflows whenever a complaint status changes.

1.  **Import the Workflow**:
    - Open your n8n instance.
    - Create a new workflow and **Import from File** using `n8n/n8n_workflow.json` from this project.
2.  **Copy the Webhook URL**:
    - In n8n, open the **Supabase Webhook** node.
    - Copy the **Production URL** (it should end in `/complaint-update`).
3.  **Set up the Supabase Webhook**:
    - Go to **Supabase Dashboard** > **Database** > **Webhooks**.
    - Create a new webhook named `notify_n8n`.
    - **Table**: `complaints`.
    - **Events**: `INSERT` and `UPDATE`.
    - **Type**: `HTTP Request`.
    - **Method**: `POST`.
    - **URL**: Paste the n8n Webhook URL.

---

## 3. End-to-End Test Flow

1.  **Citizen**: Upload a photo evidence and description.
2.  **Supabase**: Stores the image URLs in `media_attachments`.
3.  **AI**: Categorizes the issue using Gemini.
4.  **n8n**: Triggers an email notification (once webhooks are configured).
5.  **Admin**: Views the photo and AI result to assign a staff member.
