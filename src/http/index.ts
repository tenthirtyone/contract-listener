import axios from "axios";

export async function post(url, data) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
