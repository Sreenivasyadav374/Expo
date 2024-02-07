import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function App() {
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");
  const [set, setset] = useState(true);
  const renderTasks = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <Text
          style={{ fontWeight: "bold", fontSize: 20, color: "white", flex: 1 }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
            flex: 1,
            border: "2px solid white",
            borderRadius: "20%",
            padding: "1rem",
          }}
        >
          {item.location}
        </Text>
      </View>
    );
  };
  const searchUser = async () => {
    const name = search;
    const res = await axios.get("http://localhost:5000/api/data/" + name);
    if (res) {
      setdata([res.data]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        setdata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [set]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.inputtext}
        value={search}
        onChangeText={(text) => setsearch(text)}
        placeholder="Search by name"
      />
      <View style={styles.butt}>
        <TouchableOpacity style={styles.addorsave} onPress={searchUser}>
          <Text>search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addorsave}
          onPress={() => {
            setset(!set), setsearch("");
          }}
        >
          <Text>Revert</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderTasks}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    padding: 10,
    left: 110,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
  },
  card: {
    backgroundColor: "black",
    margin: 2,
    alignItems: "center",
    borderRadius: 7,
    padding: 7,
    marginHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    elevation: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  editButton: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "white",
    padding: 4,
    borderRadius: 8,
  },
  deleteButton: {
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "white",
    padding: 4,
    borderRadius: 8,
  },
  addorsave: {
    backgroundColor: "grey",
    margin: 7,
    padding: 9,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 120,
    marginVertical: 20,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    elevation: 1,
  },
  inputtext: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 7,
  },
});
