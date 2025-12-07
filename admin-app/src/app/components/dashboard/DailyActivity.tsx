"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Article {
  _id: string;
  title: string;
  content: string;
  image?: string | null;
}

const DailyActivity = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
        const data = await res.json();
        if (data.success && data.articles) {
          setArticles(data.articles);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading articles...</p>;
  }

  return (
    <div className="rounded-xl h-full shadow-xs bg-white dark:bg-darkgray p-6 relative w-full">
      <h5 className="card-title mb-10">Articles</h5>

      <div className="flex flex-col mt-2">
        <ul>
          {articles.map((item) => (
            <li key={item._id} className="mb-6">
              <div className="flex gap-4 min-h-20 items-start">
                {/* Image */}
                {item.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}`}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="h-[80px] w-[80px] rounded-md bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}

                {/* Title & Content */}
                <div>
                  <h6 className="text-sm font-medium text-dark dark:text-white">
                    {item.title}
                  </h6>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {item.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyActivity;
