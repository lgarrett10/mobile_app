import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    padding: 16,
    paddingVertical: 50,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    margin: "auto",
    marginBottom: 12,
    paddingLeft: 8,
  },
  button: {
    marginBottom: 15, // spacing between buttons
    width: "70%",
    alignSelf: "center",
  },
  message: {
    marginTop: 20,
    color: "green",
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    height: 80,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#dfdfdf",
    padding: 10,
    marginVertical: 5,
    boxShadow: "0 0 10px #ccc",
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionText: {
    color: 'blue',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },

});
