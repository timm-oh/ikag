release: PG_STATEMENT_TIMEOUT=90000 bundle exec rails db:migrate
web: bundle exec puma -p ${PORT:-3000} -e ${RACK_ENV:-development}