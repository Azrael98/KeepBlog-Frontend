// import React from "react";

// const SingleBlogPost = () => {
//   return (
//     <div className="bg-blue-100 text-blue-900">
//       <div className="max-w-3xl mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-4">Title of the Blog Post</h1>
//         <p className="text-sm mb-6">Published on May 11, 2023</p>
//         <img
//           src="/path/to/blog-image.jpg"
//           alt="Blog post"
//           className="w-full h-auto rounded-lg mb-6"
//         />
//         <p className="mb-6">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
//           volutpat velit. Nulla volutpat vestibulum sapien, eu consectetur
//           lectus. Sed eu erat semper, ultricies lacus vitae, sollicitudin odio.
//           Nullam nec tortor ac massa sagittis elementum id et massa. Fusce
//           malesuada posuere ex, at gravida est varius ac. Suspendisse non nunc
//           ut justo feugiat rhoncus.
//         </p>
//         <h2 className="text-2xl font-bold mb-4">Comments</h2>
//         <div className="bg-white rounded-lg p-4">
//           <p className="text-gray-800 mb-4">
//             User1234 commented on May 12, 2023:
//           </p>
//           <p className="text-gray-700">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
//             pharetra, ex nec hendrerit rhoncus, purus risus blandit libero, sed
//             cursus ex nisi vitae lacus.
//           </p>
//         </div>
//         {/* Add more comment sections here */}
//       </div>
//     </div>
//   );
// };

// export default SingleBlogPost;

// import React from 'react';

// const SingleBlogPost = () => {
//   // Sample data for "You May Also Like" section
//   const similarPosts = [
//     { id: 1, title: 'Related Post 1', category: 'Technology' },
//     { id: 2, title: 'Related Post 2', category: 'Technology' },
//     { id: 3, title: 'Related Post 3', category: 'Travel' },
//     { id: 4, title: 'Related Post 4', category: 'Food' },
//   ];

//   return (
//     <div className="bg-white text-gray-800 flex">
//       <div className="max-w-3xl mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-4">Title of the Blog Post</h1>
//         <p className="text-sm mb-6">Published on May 11, 2023</p>
//         <img
//           src="/path/to/blog-image.jpg"
//           alt="Blog post"
//           className="w-full h-auto rounded-lg mb-6"
//         />
//         <p className="mb-6">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
//           volutpat velit. Nulla volutpat vestibulum sapien, eu consectetur
//           lectus. Sed eu erat semper, ultricies lacus vitae, sollicitudin odio.
//           Nullam nec tortor ac massa sagittis elementum id et massa. Fusce
//           malesuada posuere ex, at gravida est varius ac. Suspendisse non nunc
//           ut justo feugiat rhoncus.
//         </p>
//         <h2 className="text-2xl font-bold mb-4">Comments</h2>
//         <div className="bg-white rounded-lg p-4">
//           <p className="text-gray-800 mb-4">
//             User1234 commented on May 12, 2023:
//           </p>
//           <p className="text-gray-700">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
//             pharetra, ex nec hendrerit rhoncus, purus risus blandit libero, sed
//             cursus ex nisi vitae lacus.
//           </p>
//         </div>
//         {/* Add more comment sections here */}
//       </div>
//       <div className="bg-blue-100 py-8 px-4">
//         <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
//         {similarPosts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white rounded-lg p-4 mb-4 shadow-md"
//           >
//             <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
//             <p className="text-sm text-gray-700">{post.category}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SingleBlogPost;

import React from 'react';

const SingleBlogPost = () => {
  // Sample data for "You May Also Like" section and comments
  const similarPosts = [
    { id: 1, title: 'Related Post 1', category: 'Technology' },
    { id: 2, title: 'Related Post 2', category: 'Technology' },
    { id: 3, title: 'Related Post 3', category: 'Travel' },
    { id: 4, title: 'Related Post 4', category: 'Food' },
  ];
  const comments = [
    { id: 1, user: 'User1234', text: 'This is a comment' },
    { id: 2, user: 'User5678', text: 'This is another comment' },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-white text-gray-800">
      <div className="max-w-3xl mx-auto md:w-2/3 px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">Title of the Blog Post</h1>
          <div className="flex space-x-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Delete
            </button>
          </div>
        </div>
        <p className="text-sm mb-6">Published on May 11, 2023</p>
        <img
          src="/path/to/blog-image.jpg"
          alt="Blog post"
          className="w-full h-auto rounded-lg mb-6"
        />
        <p className="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
          volutpat velit. Nulla volutpat vestibulum sapien, eu consectetur
          lectus. Sed eu erat semper, ultricies lacus vitae, sollicitudin odio.
          Nullam nec tortor ac massa sagittis elementum id et massa. Fusce
          malesuada posuere ex, at gravida est varius ac. Suspendisse non nunc
          ut justo feugiat rhoncus.
        </p>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white rounded-lg p-4 mb-4 flex items-start justify-between"
          >
            <div>
              <p className="text-gray-800 mb-2">{comment.user}</p>
              <p className="text-gray-700">{comment.text}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-500 hover:text-blue-600">Edit</button>
              <button className="text-red-500 hover:text-red-600">Delete</button>
            </div>
          </div>
        ))}
        {/* Add comment form here */}
      </div>
      </div>

)}

export default SingleBlogPost