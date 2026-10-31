import cassandra from "cassandra-driver";

const contactPoints = (
  process.env.CASSANDRA_CONTACT_POINTS || "127.0.0.1"
).split(",");

const client = new cassandra.Client({
  contactPoints,
  localDataCenter:
    process.env.CASSANDRA_LOCAL_DATACENTER || "datacenter1",
  keyspace:
    process.env.CASSANDRA_KEYSPACE || "streamflix",
});

export default client;