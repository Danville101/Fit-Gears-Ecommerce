# Use an official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_DB Ecom5
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD villabean101

# Copy the SQL dump file into the container
COPY ./sourcedb.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432

# Optionally, you can provide additional configuration files if needed
# COPY ./my_postgresql_conf.conf /etc/postgresql/my_postgresql_conf.conf

# The CMD instruction specifies the command to run when the container starts
CMD ["postgres"]
