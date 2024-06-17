"use client";
import Image from "next/image";
import * as React from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import MentionForm from "./MentionForm";
import { FaRegImage } from "react-icons/fa";
import { createPsoting } from "@/actions/posting";
import Modal from "../../ui/modal";
import { motion } from "framer-motion";
import { Hastags } from "@/types/hastags.type";
import { User } from "@/types/user.type";
import toast from "react-hot-toast";
import { getAllUser } from "@/actions/users";
import { getHastags } from "@/actions/hastags";
import { useQueryClient } from "@tanstack/react-query";

const PostingForm = ({
  withTitle,
  user,
}: {
  withTitle: boolean;
  user: User | null;
}) => {
  const queryClient = useQueryClient();
  const [medias, setMedias] = React.useState<
    Array<{
      path: string;
      url: string;
    }>
  >([]);
  const [users, setUsers] = React.useState<Array<User>>([]);
  const [hastags, setHastags] = React.useState<Array<Hastags>>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedMedias, setSelectedMedias] = React.useState(
    medias[0]?.url ? medias[0].url : ""
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function getDatas() {
      const mentionDatas = await getHastags();
      const users = await getAllUser();
      if (users || mentionDatas) {
        setUsers((users as Array<User>) ?? []);
        setHastags((mentionDatas as Array<Hastags>) ?? []);
      }
    }
    getDatas();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    const target = e.target as HTMLFormElement;
    const checkHastags = form
      .get("mentions")
      ?.toString()
      .split(" ")
      .filter((str) => str.startsWith("#"));

    try {
      setIsLoading(true);
      const res = await createPsoting(
        medias,
        checkHastags?.map((str) => str.replace("#", "")) as Array<string>,
        form
      );
      if (res) {
        toast.success("Posted successfully", {
          duration: 2000,
        });
        target.reset();
        setMedias([]);
        queryClient.invalidateQueries({ queryKey: ["postings"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["postings"] });
        console.log("gagal");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("bucketName", "posting");
      formData.append("file", file);
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/posting/media", {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        setMedias((prev) => [
          ...prev,
          { url: result.url as string, path: result.path as string },
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section>
      {withTitle && (
        <h1 className="text-2xl mb-3 font-bold">Post something do you want!</h1>
      )}
      <div className="w-full flex gap-4 pt-3 ">
        <picture>
          <Image
            src={user?.photo ? user.photo : "/userdefault.png"}
            alt="Profile"
            width={60}
            height={60}
          />
        </picture>
        <div className="w-full pt-1 pl-3 border-l-4 border-l-slate-700">
          <form onSubmit={onSubmit}>
            <TextAreaAutoSize
              className="w-full resize-none bg-primary px-2 py-2 placeholder:text-xl border-b-4 border-b-slate-700 outline-none"
              minRows={2}
              maxRows={25}
              name="content"
              placeholder="What is happening ?!"
            />
            <div className="w-full gap-4 mt-4 relative">
              <MentionForm
                field="name"
                data={users?.map((user) => ({
                  id: user.id,
                  name: user.name,
                  image: user.photo ? user.photo : "/userdefault.png",
                  username: user.username,
                }))}
                dataHastags={hastags.map((hastag) => hastag.name)}
                next={(query: string) =>
                  users
                    ?.map((user) => ({
                      id: user.id,
                      name: user.name,
                      image: user.photo ? user.photo : "/userdefault.png",
                      username: user.username,
                    }))
                    .filter((customer) => {
                      return customer.name
                        .toLowerCase()
                        .startsWith(query.toLowerCase());
                    })
                }
                nextHastags={(query: string) =>
                  hastags
                    .map((hastag) => hastag.name)
                    .filter((tag) => {
                      return tag.toLowerCase().startsWith(query.toLowerCase());
                    })
                }
              />
            </div>
            {medias.length > 0 ? (
              <div
                className={`w-full mt-4 ${
                  medias.length > 1 ? "grid grid-cols-2 gap-2" : ""
                }`}
              >
                {medias[0]?.url
                  .split(".")
                  .find((str) => str.includes("mp4")) ? (
                  <video
                    className={`w-full ${
                      medias.length === 1 ? "aspect-[1/.9]" : "h-full"
                    } object-contain rounded-xl object-center`}
                    controls
                  >
                    <source src={medias[0]?.url} type="video/mp4" />
                  </video>
                ) : (
                  <figure
                    className={`relative w-full ${
                      medias.length === 1 && "aspect-[1/.9]"
                    }`}
                  >
                    <Image
                      src={medias[0]?.url ?? ""}
                      alt="Media"
                      fill
                      loading="lazy"
                      className="rounded-xl object-cover object-center"
                    />
                  </figure>
                )}

                {medias.length > 1 ? (
                  <div className="flex flex-col">
                    {medias
                      .filter((_, i) => i > 0)
                      .slice(0, 2)
                      .map((asset, i) =>
                        asset.url
                          .split(".")
                          .find((str) => str.includes("mp4")) ? (
                          <div
                            key={`gallery_${i}`}
                            className="relative"
                            onClick={() => setOpenModal(true)}
                          >
                            {medias.length > 3 && i === 1 ? (
                              <div
                                onClick={() => setOpenModal(true)}
                                className="w-full h-full hover:opacity-100 opacity-0 transition-opacity duration-300 ease-out absolute z-30 flex justify-center items-center bg-black bg-opacity-60 cursor-pointer rounded-xl text-3xl top-0 left-0"
                              >
                                +3
                              </div>
                            ) : null}
                            <video
                              className="w-full h-[1/1.2] object-contain rounded-xl object-center"
                              controls
                            >
                              <source src={asset.url} type="video/mp4" />
                            </video>
                          </div>
                        ) : (
                          <figure
                            className="relative w-full aspect-[1/.9]"
                            key={`gallery_${i}`}
                          >
                            {medias.length > 3 && i === 1 ? (
                              <div
                                onClick={() => setOpenModal(true)}
                                className="w-full h-full hover:opacity-100 opacity-0 transition-opacity duration-300 ease-out absolute z-30 flex justify-center items-center bg-black bg-opacity-60 cursor-pointer rounded-xl text-3xl top-0 left-0"
                              >
                                +3
                              </div>
                            ) : null}
                            <Image
                              src={asset.url}
                              alt="Media"
                              fill
                              priority
                              className="rounded-xl object-cover object-center"
                            />
                          </figure>
                        )
                      )}
                  </div>
                ) : null}
                <Modal open={openModal} setOpen={setOpenModal}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    exit={{
                      scale: 0,
                    }}
                    className="fixed flex flex-col  h-fit max-w-[750px] m-auto inset-0 gap-4 z-30 overflow-auto"
                  >
                    {selectedMedias
                      .split(".")
                      .find((str) => str.includes("mp4")) ? (
                      <div className="relative w-full aspect-[1/.8]">
                        <a
                          href={selectedMedias}
                          target="_blank"
                          className="mix-blend-difference font-bold text-xl absolute top-2 z-20 left-2"
                        >
                          Open in browser
                        </a>
                        <video controls className="w-full h-full" autoPlay>
                          <source src={selectedMedias} type="video/mp4" />
                        </video>
                      </div>
                    ) : (
                      <figure className="w-full aspect-[1/.8] relative">
                        <Image
                          src={selectedMedias}
                          alt="Media"
                          fill
                          priority
                          className="object-cover object-center"
                        />
                        <a
                          href={selectedMedias}
                          target="_blank"
                          className="mix-blend-difference font-bold text-xl absolute bottom-2 left-2"
                        >
                          Open in browser
                        </a>
                      </figure>
                    )}

                    <div className="max-w-full flex gap-2 overflow-y-auto more-gallery">
                      {medias.map((asset, i) =>
                        asset.url
                          .split(".")
                          .find((str) => str.includes("mp4")) ? (
                          <div key={`g_${i}`} className="w-[100px] h-[100px]">
                            <video
                              className="object-center w-full h-full"
                              onClick={() => setSelectedMedias(asset.url)}
                            >
                              <source src={asset.url} type="video/mp4" />
                            </video>
                          </div>
                        ) : (
                          <Image
                            key={`g_${i}`}
                            onClick={() => setSelectedMedias(asset.url)}
                            src={asset.url}
                            alt="Media"
                            width={100}
                            height={100}
                            priority
                            className="object-cover object-center "
                          />
                        )
                      )}
                    </div>
                  </motion.div>
                </Modal>
              </div>
            ) : null}
            <div className="w-full flex justify-between items-center mt-4">
              <div>
                <label
                  htmlFor="upload_image"
                  className="text-2xl cursor-pointer peer-[:disabled]:cursor-not-allowed"
                >
                  <FaRegImage />
                </label>
                <input
                  type="file"
                  className="hidden peer"
                  id="upload_image"
                  disabled={isLoading}
                  onChange={handelUpload}
                />
              </div>
              <button
                className="bg-sky-500 px-6 py-3 rounded-full text-lg disabled:bg-opacity-65 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Proccess" : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PostingForm;
