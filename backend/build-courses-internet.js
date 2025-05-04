//PLEASE DON'T TAMPER WITH THIS FILE
//  implementation will be carried out soon


import { google } from 'googleapis';
import slugify from 'slugify';
import { v4 as uuid } from 'uuid';
import fs from 'fs';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

const videoIds = [
  'bMknfKXIFA8',  // freeCodeCamp React Full Course
  'PkZNo7MFNFg',  // freeCodeCamp Python for Beginners
  'ENrzD9HAZK4',  // Traversy JavaScript Tutorial for Beginners
  't-c13pbxaU',  // freeCodeCamp Node.js Full Course
  'UB1O30fR-EE',  // freeCodeCamp HTML Full Course
  'yfoY53QXEnI',  // freeCodeCamp CSS Full Course
  'HXV3zeQKqGY',  // freeCodeCamp SQL Tutorial
  'RGOj5yH7evk',  // freeCodeCamp Git & GitHub Tutorial
  'ZfFM0pVbS1s',  // freeCodeCamp Docker Tutorial
  'wtlB1y7sl1o',  // freeCodeCamp TypeScript Course
];

async function fetchVideos(ids) {
  const res = await youtube.videos.list({
    part: ['snippet', 'statistics'],
    id: ids,
  });
  return res.data.items;
}

(async () => {
  const videos = await fetchVideos(videoIds);
  const courses = videos.map((v) => {
    const vid = v.id;
    const snippet = v.snippet;
    const stats = v.statistics;
    const channelId = snippet.channelId;
    // build slug from title
    const slug = slugify(snippet.title, { lower: true, strict: true }).slice(0, 30);
    // basic course object
    return {
      id: uuid(),
      slug,
      type: 'free',
      price: 0,
      oldPrice: 0,
      rating: 4.7,                       // you can adjust or fetch if you like
      reviews: parseInt(stats.viewCount, 10),
      category: 'programming',           // adjust per-video if needed
      thumbnail: snippet.thumbnails.maxres
        ? snippet.thumbnails.maxres.url
        : snippet.thumbnails.high.url,
      title: snippet.title,
      videoURL: `https://www.youtube.com/watch?v=${vid}`,
      instructorId: channelId,
      instructorName: snippet.channelTitle,
      instructorProfileImage: `https://yt3.ggpht.com/ytc/AKedOLT-${channelId}=s88-c-k-c0x00ffffff-no-rj`,
      instructorProfileURL: `https://www.youtube.com/channel/${channelId}`,
      isVerified: true,                  // you could check via channels.list if you want
      isFollowing: false,                // default; change if you integrate with your user
      date: snippet.publishedAt,         // full ISO date
      description: snippet.description,
      learningPatterns: ['video'],       // you can post-process to add “interactive” if you build quizzes
      learningObjectives: [],            // fill manually or via NLP
      requirements: [],                  // same
      sections: [],                      // template or empty; you can automate from a chapter list if present
    };
  });

  fs.writeFileSync(
    './tempCourses.json',
    'const tempCourses: Course[] = ' +
      JSON.stringify(courses, null, 2) +
      ';',
    'utf-8'
  );
  console.log('✅ Wrote tempCourses.json with', courses.length, 'items.');
})();
