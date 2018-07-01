#!/bin/bash

mkdir deploy
zip -r deploy/sns-filter-policy.zip index.js index_impl.js snsApi.js node_modules/
