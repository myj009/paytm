FROM mongo:4.4.7

# Create directories for MongoDB data and logs
RUN mkdir -p /data/db /data/configdb

# Copy the MongoDB configuration file
COPY mongod.conf /etc/mongod.conf

# Expose ports
EXPOSE 27017

# Command to run MongoDB with replica set configuration
CMD ["mongod", "--config", "/etc/mongod.conf", "--replSet", "rs0"]
