#!/bin/bash

# Upload the static website and invalidate the CloudFront cache so that changes can be seen without waiting
aws s3 cp app/ s3://splashflag.com --recursive	

#invalidate cloudfront cache. need to programmatically grab distribution id in the future
aws cloudfront create-invalidation --distribution-id E3CX7N72WPMECN --paths "/*" 2>&1 > /dev/null