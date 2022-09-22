import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Navbar from "../components/NavBar";
import PostItem from "../components/PostItem";
import styles from "../styles/Home.module.css";
import { fetchBlogPosts } from "../utils/api";
import { Category, categoryArray, Post } from "../utils/types";

const Home: NextPage<{ query: any }> = ({ query }) => {
  const { isLoading, data, refetch, isFetching } = useQuery(
    "blog-posts",
    fetchBlogPosts
  );
  const router = useRouter();
  const [posts, setPost] = useState([]);
  const [categories, setCategories] = useState(categoryArray);
  const [filteredPostData, setFilteredPostData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    query?.filter ? (query?.filter as string) : "0"
  );
  const [searchBarValue, setSearchBarValue] = useState(
    query?.query ? (query?.query as string) : ""
  );

  useEffect(() => {
    setPost(data?.data);
    setFilteredPostData(data?.data);
    filterNotEmptyCategories();
  }, [data]);

  useEffect(() => {
    filterNotEmptyCategories();
    searchBarValue
      ? filterDataBySearch()
      : filterValuesByCategory(selectedCategoryId);
  }, [posts]);

  useEffect(() => {
    filterDataBySearch();
    searchBarValue !== "" ? setRouterQuery() : null;
  }, [searchBarValue]);

  useEffect(() => {
    filterValuesByCategory(selectedCategoryId);
    selectedCategoryId !== "" ? setRouterFilter() : null;
  }, [selectedCategoryId]);

  const setRouterFilter = (): void => {
    router.push({
      pathname: "/",
      query: { query: router.query.query, filter: selectedCategoryId },
    });
  };

  const setRouterQuery = (): void => {
    router.push({
      pathname: "/",
      query: { query: searchBarValue, filter: router.query.filter },
    });
  };

  const fetchBlogPost = (slug: any) => {
    let dynamicNews = `https://www.alpha-orbital.com/news/${slug}`;
    router.push(dynamicNews);
  };

  const filterNotEmptyCategories = (): void => {
    setCategories([
      ...categoryArray.filter(
        (categoryItem: Category) =>
          posts?.filter(
            (postItem: Post) => postItem.post_category_id === categoryItem.id
          ).length > 0
      ),
      ...categoryArray.filter((c) => c.id === "0"),
    ]);
  };

  const isShowAllCategory = (): boolean => selectedCategoryId === "0";

  const filterValuesByCategory = (id: string): any => {
    id !== "0"
      ? setFilteredPostData(
          posts?.filter((item: Post) => item.post_category_id === id)
        )
      : setFilteredPostData(posts);
  };

  const refechData = (): void => {
    refetch();
    setFilteredPostData(posts);
    setCategories(categoryArray);
  };

  const deletePost = (slug: string, categoryId: string): void => {
    const restOfPosts = posts.filter((item: Post) => item.slug !== slug);
    setPost(restOfPosts);
    setFilteredPostData(restOfPosts);
    if (
      restOfPosts.find((item: Post) => item.post_category_id === categoryId) ===
      undefined
    )
      resetCategories();
  };

  const deleteAllWithCategory = (categoryId: string): void => {
    const restOfPosts = posts.filter(
      (item: Post) => item.post_category_id !== categoryId
    );
    setPost(restOfPosts);
    setFilteredPostData(restOfPosts);
    resetCategories();
  };

  const checkCategoryId = (id: string): boolean => {
    return isShowAllCategory() ? true : id === selectedCategoryId;
  };

  const onSearchBarEventChange = (text: string): void => {
    setSearchBarValue(text);
  };

  const filterDataBySearch = (): void => {
    if (searchBarValue.length > 2) {
      const tempSearchResults = posts?.filter(
        (item: Post) =>
          item.title.toLowerCase().includes(searchBarValue.toLowerCase()) &&
          checkCategoryId(item.post_category_id)
      );
      setFilteredPostData(
        tempSearchResults?.length > 0 ? tempSearchResults : []
      );
    } else if (searchBarValue.length === 0) {
      filterValuesByCategory(selectedCategoryId);
    } else {
      filterValuesByCategory(selectedCategoryId);
    }
  };

  const resetCategories = (): void => {
    setSearchBarValue("");
    setSelectedCategoryId("0");
  };

  if (isLoading || isFetching) {
    return <div className={styles.container}></div>;
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Alpha orbital</title>
          <meta name="Alpa Orbital" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar
          deleteAll={deleteAllWithCategory}
          activeIdx={selectedCategoryId}
          categories={categories}
          setSelectedCategoryId={setSelectedCategoryId}
        />

        <input
          value={searchBarValue}
          className={styles.search_input}
          type="text"
          placeholder="...search article title or excerpt..."
          onChange={(event) => onSearchBarEventChange(event.target.value)}
        />

        <h4 className={styles.total_article_num}>
          Currently showing {filteredPostData?.length} articles
          {selectedCategoryId === "0" && filteredPostData?.length < 100 && (
            <button style={{ marginLeft: "10px" }} onClick={() => refechData()}>
              {" "}
              Refetch{" "}
            </button>
          )}
        </h4>

        {filteredPostData?.slice(0, 100).map((post: Post) => (
          <PostItem
            key={post.slug}
            post={post}
            deletePost={deletePost}
            fetchBlogPost={fetchBlogPost}
          />
        ))}
      </div>
    </>
  );
};

Home.getInitialProps = async ({ query }) => {
  return { query };
};

export default Home;
