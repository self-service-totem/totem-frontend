# React + Vite

## Install
	npm create vite@latest kiosk-frontend -- --template react
	cd kiosk-frontend
	npm install

## Run
	download gpt component and paste replacing  src/App.jsx
	npm run dev

## Build
	npm run build
	copy dist/ into s3 backet
        export AWS_PROFILE=ffresco
	    aws sts get-caller-identity --profile ffresco
        aws s3 sync dist/ s3://totem-frontend-ffresco --delete --profile ffresco
    	aws cloudfront create-invalidation --distribution-id TU_DISTRIBUTION_ID --paths "/*" --profile ffresco
