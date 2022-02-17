## Overview

This project addresses the following:

* Handling a dataset of 100,000+ rows
* Creation of an API that abstracts away the underlying implementation.
* Creation of a backend that serves up the data.
* Allow sorting by clicking on columns.
* Draggable columns

## Launch prerequisites

The dependencies for the back and front must be installed before first launch. To do so, navigate to the
directories `datagrid-back`
and `datagrid-front` and install the dependencies with `yarn`.

The `datagrid-back` relies on environment variables to start the server. To define the variables, create a `.env` file
in the `datagrid-back` folder and fill the file with the following values:
```dotenv
# Server
SERVER_PORT=8000
SERVER_CORS_ORIGIN=*

# Logger
LOGGER_LEVEL=info
LOGGER_ERROR_LOG_FILENAME=error.log
LOGGER_COMBINED_LOG_FILENAME=combined.log
```