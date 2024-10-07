import axios from "axios";

export const authenticator = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/image-kit` as string);
      console.log(response.data)
      const { signature, expire, token } = response.data;
      return { signature, expire, token };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Authentication request failed: ${error.response?.status} ${error.response?.statusText}`
        );
      } else {
        throw new Error(
          `Authentication request failed: ${(error as Error).message}`
        );
      }
    }
  };
