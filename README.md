[![codecov](https://codecov.io/gh/bigboxer23/solar-moon-public/branch/master/graph/badge.svg)](https://codecov.io/gh/bigboxer23/solar-moon-public)

# solar-moon-public

This is the project for the public facing website for solar moon analytics.

The project is built in react and does not require any further server-side APIs to load. It is intended to be deployed
directly to an S3 bucket and served from there or via cloudfront.

### Building

#### GitHub Action

- See `workflows/deploy.yml`. This action is integrated into the `master` branch such that any changes pushed trigger a
  rebuild and deploy of the project to the defined (in github secrets) s3 bucket.
- There are four necessary parameters to define in GitHub secrets:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `S3_BUCKET_REGION`
  - `S3_BUCKET`

#### Manually

- Scripts to build, deploy and rollback manually exist, see [solar-moon-server-config/website](https://github.com/bigboxer23/solar-moon-server-config/tree/main/scripts/website).
