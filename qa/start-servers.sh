#!/usr/bin/env bash
# Starts (without rebuilding) 3100 preview, 3101 mock-live, 3102 public fixture. Kills any previous next servers first.
pkill -f "[n]ext-server"; pkill -f "[n]pm exec next"; sleep 1
nohup npx next start -p 3100 >/tmp/s1.log 2>&1 &
ENQUIRY_MODE=live ENQUIRY_TRANSPORT=mock nohup npx next start -p 3101 >/tmp/s2.log 2>&1 &
SITE_MODE=public SITE_URL=https://example.test LAUNCH_CONFIG_PATH=qa/fixtures/launch-config.public.json NEXT_DIST_DIR=.next-public nohup npx next start -p 3102 >/tmp/s3.log 2>&1 &
sleep 5
