import Link from 'next/link';
import { getList } from '@/libs/microcms';
import { formatDate } from '@/libs/utils';
import styles from './page.module.css';

export default async function Home() {
  const data = await getList();
  return (
    <ul>
      {data.contents.map((article) => (
        <li key={article.id} className={styles.list}>
          <Link href={`/articles/${article.id}`} className={styles.link}>
            <picture>
              <source
                type="image/webp"
                media="(max-width: 640px)"
                srcSet={`${article.thumbnail?.url}?fm=webp&w=414 1x, ${article.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`}
              />
              <source
                type="image/webp"
                srcSet={`${article.thumbnail?.url}?fm=webp&fit=crop&w=240&h=126 1x, ${article.thumbnail?.url}?fm=webp&fit=crop&w=240&h=126&dpr=2 2x`}
              />
              <img
                src={article.thumbnail?.url}
                alt=""
                className={styles.image}
                width={article.thumbnail?.width}
                height={article.thumbnail?.height}
              />
            </picture>
            <dl className={styles.content}>
              <dt className={styles.title}>{article.title}</dt>
              <dd>{formatDate(article.publishedAt || article.createdAt)}</dd>
            </dl>
          </Link>
        </li>
      ))}
    </ul>
  );
}
