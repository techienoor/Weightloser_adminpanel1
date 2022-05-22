import Layout from "components/Layout";
import Details from "components/Blogs/Details";
import { useParams } from "react-router";

const BlogDetailsPage = () => {
  const { id } = useParams();
  return (
    <Layout>
      <Details blogId={id} />
    </Layout>
  );
};

export default BlogDetailsPage;
