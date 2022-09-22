import { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/PostItem.module.css";
import { Post } from "../utils/types";
import PostDeleteButton from "./PostDeleteButton";

const PostItem: NextPage<{
  deletePost(slug: string, categoryId: string): any;
  fetchBlogPost(slug: string): any;
  post: Post;
}> = ({ deletePost, fetchBlogPost, post }) => {
  const convertDate = (date: string): string => {
    const newDate: Date = new Date(date);
    return newDate.toLocaleDateString();
  };

  return (
    <div key={post.slug} className={styles.card}>
      <div className={styles.card_content}>
        <Image
          loader={() => "src"}
          unoptimized
          className={styles.cursor}
          width="100%"
          height="60%"
          layout="responsive"
          objectFit="contain"
          src={
            "https://www.alpha-orbital.com/assets/images/post_img/" +
            post.post_image
          }
          onClick={() => fetchBlogPost(post.slug)}
          alt={post.post_thumbnail}
        />
      </div>
      <div className={styles.card_content}>
        <PostDeleteButton
          deletePost={() => deletePost(post.slug, post.post_category_id)}
        />
        <h3 className={styles.cursor} onClick={() => fetchBlogPost(post.slug)}>
          {post.title}
        </h3>
        <small>{convertDate(post.date)}</small>
        <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
        <a className={styles.link} onClick={() => fetchBlogPost(post.slug)}>
          Full article
        </a>
      </div>
    </div>
  );
};

export default PostItem;
