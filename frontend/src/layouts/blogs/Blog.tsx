import PostAvatar from "@/components/PostAvatar";
import { Button } from "@/components/ui/button";
import { tempBlogs } from "@/constants/temp";
import { cn } from "@/lib/utils";
import { Eye, Heart, MessageCircle, Share } from "lucide-react";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaMicrophone, FaShareNodes } from "react-icons/fa6";
import { Navigate, useLocation } from "react-router-dom";
import RecommendedReads from "./RecommendedReads";
import Comments from "@/components/Comments";

const Blog = ({ className }: PageProps) => {
  const id = useLocation().pathname.split('/').pop();
  const [blog, setBlog] = useState<Blog | undefined>(tempBlogs.find((item) => item.id === id))


  // const pathname = 
  // make a get request for the post

  const handleFollow = (isFollowing: boolean) => {
    const updatedBlog: Blog = { ...blog, isFollowing: !isFollowing };
    setBlog(updatedBlog);
  }

  const handleLike = (isLiked: boolean) => {
    const newLikedCount = !isLiked ? blog?.likes + 1 : blog?.likes - 1;
    const updatedBlog: Blog = { ...blog, isLiked: !isLiked, likes: newLikedCount };
    setBlog(updatedBlog);
  }

  return (
    <main className={className + " padding-y"}>
      {blog ? (
        <div className="flex flex-col px-4 sm:px-8 md:px-28">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <PostAvatar profileName={blog.posterName}
                profileURL={blog.posterProfileURL}
                profileImage={blog.posterProfileImage}
                description={blog.date}
                isVerified={blog.isVerified}
              />

              <Button onClick={() => handleFollow(blog.isFollowing)}>{blog.isFollowing ? 'Following' : 'Follow'}</Button>
            </div>

            <Button variant={"transparent"}><FaSave size={20} /></Button>
          </div>

          <img src={blog.thumbnail} className="h-[425px] sm:h-[500px] object-cover sm:object-contain mx-auto mt-6" alt="" />

          <div className="flex justify-between gap-5">

            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <Button variant={"transparent"} className="p-0" onClick={() => handleLike(blog.isLiked)}><Heart className={cn("", { 'text-low-contrast fill-red-foreground': blog.isLiked })} /></Button>
                {blog.likes}
              </div>

              <div className="flex items-center gap-1">
                <Eye className="text-low-contrast" />
                {blog.views}
              </div>

              <div className="flex items-center gap-1">
                <MessageCircle className="text-low-contrast" />
                {blog.comments.count}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant={'transparent'} className="p-0"><FaShareNodes size={20} /></Button>
              <Button variant={'transparent'} className="p-0"><FaMicrophone size={20} /></Button>
            </div>

          </div>
          <hr className="mb-5 mt-3" />

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl">{blog.title}</h2>

            <div className="first-letter:font-bold first-letter:text-2xl">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe provident, voluptas obcaecati ipsum necessitatibus illo non quia architecto impedit mollitia officia nisi tempore culpa laborum cupiditate. Fugit obcaecati officiis laudantium alias non eligendi, aut suscipit maiores praesentium dolores ea quaerat enim corrupti. Reprehenderit, harum deleniti itaque eos nobis eligendi id similique, assumenda voluptates, minus asperiores aliquid commodi ratione voluptatum illum esse cupiditate magnam fugiat quas sit eius quaerat fugit consectetur excepturi. Laboriosam facere animi rerum, mollitia praesentium, non repellendus earum deleniti eius fuga enim culpa temporibus incidunt soluta aliquid explicabo omnis? Aut voluptate magni saepe, ipsam ducimus laboriosam aliquid corrupti cupiditate voluptatem dolorum odio laudantium mollitia consequuntur rerum vero amet alias cum praesentium illo maxime? Hic, sint adipisci? Fugit, id delectus? Minima mollitia tempora ratione odio? Optio, in. Illo magni, doloribus est sunt hic blanditiis ullam dignissimos minus quis quae, error praesentium eaque odio unde laboriosam tenetur neque itaque pariatur, provident eveniet architecto labore ipsa doloremque nulla. Eius dolor iure reprehenderit at pariatur corporis adipisci commodi, quaerat quis vero nesciunt dignissimos sed alias! Atque cupiditate deleniti magni, assumenda facilis eaque deserunt, in voluptatum voluptatem recusandae minima, dolor rem nulla nihil hic! Quia laudantium maiores quisquam tempora dolores cum cumque perspiciatis similique! Ab esse itaque et, necessitatibus at voluptatem excepturi non, inventore soluta, repudiandae facere? Quae atque, veritatis optio ut nemo libero assumenda placeat architecto laborum commodi tenetur, saepe, nostrum at blanditiis! Unde ut dolore voluptate aliquid eligendi repellat id a qui nobis molestias dolores at libero quia, illum laboriosam velit sint pariatur officia accusantium! Asperiores explicabo earum atque quam, minus, alias, voluptates dolore iste reprehenderit ipsum modi repellat quaerat! Provident praesentium recusandae quo, tenetur nobis beatae illum quae qui porro ab consequuntur numquam a modi fugiat perferendis placeat eveniet necessitatibus. Similique nulla ipsum et. Dolore, inventore, consequuntur rem illo ratione dolorum quam sit, molestias ex ducimus explicabo maiores nam. Obcaecati doloremque possimus quasi, accusantium facere voluptas esse sit ipsa eligendi cupiditate dolorum laudantium culpa quaerat omnis odit harum ipsum animi, commodi ipsam tempore dolorem et placeat. Facilis, delectus dicta? Soluta officia, qui impedit magnam nam cumque corporis ea corrupti quidem. Quam ipsam facere dignissimos, culpa necessitatibus libero doloremque nobis exercitationem nulla beatae amet deserunt. Fugit porro, sit eligendi numquam explicabo ex maxime delectus! Repellendus neque voluptate dignissimos. Eligendi quos exercitationem quasi dolore accusamus perferendis et reiciendis id iusto animi rem, beatae ipsa rerum non voluptatibus, voluptas error minus quae inventore nesciunt cum itaque velit? Voluptates voluptas eaque a veniam animi laboriosam assumenda incidunt nostrum aspernatur ut dolore provident saepe dolores non distinctio illum numquam possimus qui beatae esse, dolorem facilis corporis! Voluptatem a amet nemo nesciunt voluptatibus delectus repellendus velit neque blanditiis, fugit saepe id dolorum quasi repudiandae adipisci qui dolore ab quibusdam maxime! Magnam vel ipsam fugit consequatur ipsa incidunt quod deserunt voluptatum sed tenetur, blanditiis sunt quo vero? Voluptatum quibusdam praesentium beatae nemo animi fugit neque nihil natus minima voluptate iure repudiandae eius quo, est necessitatibus corrupti officia tempore asperiores a culpa cumque autem maiores quas. Quae harum, eum eius numquam voluptatum neque fugiat similique! Cum rem molestiae explicabo id amet eum error pariatur iure nesciunt? Commodi dignissimos nihil laudantium magni. Veritatis officia distinctio illum laborum quo sit, optio officiis cupiditate neque doloremque veniam possimus non saepe? Maxime magni doloribus, sint, porro facere accusamus dignissimos aliquid quam libero quas cupiditate! Aliquam itaque quaerat reprehenderit illum ea. Consequuntur labore tenetur nulla porro harum corrupti beatae aspernatur aliquid enim repellat? Magni hic ipsum quo earum natus molestias nemo corporis neque, aliquam minima! Quis quas labore, dicta, numquam incidunt quos vitae exercitationem alias optio, quo non ratione at culpa enim eos eius facere nemo? Rerum a ex, nobis provident, impedit doloremque similique consectetur dolorum tenetur quas ipsam veritatis itaque ab inventore. Odit exercitationem impedit, officia numquam minima nesciunt odio, fuga sunt minus sed voluptate dicta saepe corporis iste esse amet a eius, consequatur alias velit ex consectetur asperiores perspiciatis cupiditate. Distinctio id quod autem inventore molestiae illum nesciunt eligendi ut ipsa, rem quae itaque tempore numquam animi iure eveniet ducimus neque quos maxime necessitatibus repudiandae, quidem est sint consequatur! Aliquid dolorum natus praesentium, dolore fuga voluptatem at labore! Nesciunt, quasi? Voluptatibus explicabo officiis dolorem blanditiis tenetur, molestias nesciunt ipsum non totam. Neque ipsa quam facilis excepturi possimus! Animi beatae sequi voluptatem totam omnis atque ex exercitationem doloribus minima in error et, sint ea perferendis consequatur? Commodi praesentium voluptatibus nemo dicta at quas a est pariatur in. Iure a suscipit porro nesciunt aspernatur voluptatum dolorem natus explicabo dolore, doloribus hic deleniti ipsum ad voluptatibus aliquid! Numquam quaerat esse id dolorum, veritatis maxime eos error unde beatae. Soluta nam unde vero minima, asperiores odit quis provident fugiat deserunt laboriosam. Quidem mollitia perspiciatis eligendi, tenetur eius ipsum non earum magnam voluptatem ducimus natus doloremque at quos ab accusamus fuga est iure. Beatae dignissimos ea soluta nam molestiae distinctio corporis illo, dolorum, veniam dolore natus temporibus, esse expedita porro accusamus quam doloremque eos ad? Nulla perferendis eaque, impedit corrupti incidunt magnam accusantium esse ipsum rerum voluptate nesciunt eum cumque vel vero labore non deleniti laudantium ex in omnis beatae. Magnam repudiandae, sit facere veritatis vero dolorem facilis saepe eos at mollitia sunt, numquam consequuntur. Consectetur repellat, numquam repellendus impedit deleniti ullam modi esse voluptate voluptatum alias in placeat reprehenderit facere aspernatur inventore. Ad, dolore, placeat iure reiciendis in suscipit ipsam explicabo ipsum eius quae itaque porro, voluptates sit dolor facere. Exercitationem, tempora veritatis. Fugit veniam laborum velit maiores similique aut repellendus, aliquid magnam tempora voluptatibus ipsum pariatur corporis suscipit dolor unde odit consequatur dolores ducimus iste assumenda incidunt saepe. Labore non, dicta praesentium minima hic distinctio at adipisci fuga culpa recusandae dolor similique nisi officiis ipsam deserunt quasi reprehenderit aspernatur magni exercitationem aliquam tenetur. Ratione necessitatibus esse dicta, aperiam accusamus quo. Sit voluptatibus excepturi a minus deserunt, nostrum magnam aliquid ipsa. Eius doloremque illum dolore nulla distinctio, mollitia nam ad unde laudantium aperiam totam aspernatur magni et perferendis officia maiores eveniet obcaecati velit hic deleniti? Quae id voluptas enim eius aut, ex repellendus quod, amet, facere perferendis tempora culpa est quaerat. Quaerat, doloremque consequuntur, suscipit quae rerum similique non ducimus eaque odio dignissimos, unde veritatis molestiae harum commodi ratione quod debitis porro maiores pariatur odit. Officia voluptas veritatis amet quam sapiente quasi nam, perspiciatis sed quidem unde modi impedit nostrum minus vitae, maiores officiis sint earum libero illum animi commodi repellendus ipsa! Harum natus modi expedita tempore vel laborum voluptates veniam, odio nesciunt, iure id incidunt accusamus dolor magnam temporibus assumenda debitis optio cum similique error, sapiente voluptas. Numquam sit dolore fuga veritatis commodi dolor, deserunt molestiae, laborum consequuntur fugit eveniet sapiente in? Fuga dicta, reprehenderit veritatis consectetur magni porro quis quam necessitatibus sint sed et est autem modi tenetur voluptates at consequatur! Laborum consectetur hic, voluptates quod voluptatem vero iusto alias quia! Hic quos aliquid consectetur! Maiores, impedit nobis! Inventore dolore esse quisquam eius. Ut adipisci dolore velit labore, iusto facere accusamus excepturi, est molestias, cumque deserunt dicta minus dolorum corporis animi aspernatur dolorem fuga deleniti perferendis harum obcaecati blanditiis earum illo quam. Consequuntur rem possimus nesciunt reprehenderit nemo inventore earum impedit illum id quasi adipisci repellendus atque ab, dicta accusantium, a necessitatibus temporibus ratione blanditiis! Vero magnam illo dolorem voluptates, a tempora quia?
            </div>
          </div>

          <div className="flex flex-col gap-8 mt-28">
            <RecommendedReads />

            <Comments data={blog.comments}  postId={blog.id} />
          </div>
        </div>
      )
        : <Navigate to='/404' />
      }
    </main>
  )
}

export default Blog