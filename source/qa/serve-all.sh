#!/usr/bin/env bash
# Builds preview + public-fixture variants and starts: 3100 preview, 3101 preview+mock live form, 3102 public fixture (host example.test).
set -e
pkill -f "[n]ext-server" || true; pkill -f "[n]pm exec next" || true
npx next build >/tmp/build-preview.log 2>&1
SITE_MODE=public SITE_URL=https://example.test LAUNCH_CONFIG_PATH=qa/fixtures/launch-config.public.json NEXT_DIST_DIR=.next-public npx next build >/tmp/build-public.log 2>&1
nohup npx next start -p 3100 >/tmp/s1.log 2>&1 &
ENQUIRY_MODE=live ENQUIRY_TRANSPORT=mock nohup npx next start -p 3101 >/tmp/s2.log 2>&1 &
SITE_MODE=public SITE_URL=https://example.test LAUNCH_CONFIG_PATH=qa/fixtures/launch-config.public.json NEXT_DIST_DIR=.next-public nohup npx next start -p 3102 >/tmp/s3.log 2>&1 &
sleep 5
