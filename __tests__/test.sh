#!/bin/sh

# mkdir -p output && rm -rf output/*

OUTPUT_FILE=cat-card.jpg

if [ -f "$OUTPUT_FILE" ]; then
    echo "$OUTPUT_FILE exists. Clearing..."
    rm $OUTPUT_FILE
fi

# run application
npm start

# test
if [ -f "$OUTPUT_FILE" ]; then
    echo "$OUTPUT_FILE found. Success!"
    rm $OUTPUT_FILE
else
    echo "Error! $OUTPUT_FILE was not created." 1>&2
    exit 1
fi