"use client";
import Image from "next/image";
import * as React from "react";
import Modal from "../../ui/modal";
import { motion } from "framer-motion";
import { url } from "inspector";

type Props = {
  gallery: Array<{
    path: string;
    url: string;
  }>;
};

const GalleryMedia = ({ gallery }: Props) => {
  const [selectedGalleryModal, setSelectedGalleryModal] =
    React.useState<string>(gallery[0]?.url ?? "");
  const [openModal, setOpenModal] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (openModal) {
      videoRef.current?.play();
    }
  }, [openModal]);

  return (
    <section
      className={`w-full ${
        gallery.length > 1 ? "grid grid-cols-2 gap-2" : " "
      }`}
    >
      {gallery[0]?.url.split(".").find((str) => str.includes("mp4")) ? (
        <video
          className={`w-full ${
            gallery.length === 1 ? "aspect-[1/.9]" : "h-full"
          } object-contain rounded-xl object-center`}
          controls
        >
          <source src={gallery[0]?.url} type="video/mp4" />
        </video>
      ) : (
        <figure
          className={`relative w-full ${
            gallery.length === 1 && "aspect-[1/.9]"
          } mt-4`}
        >
          <Image
            src={gallery[0]?.url ?? ""}
            alt="Media"
            fill
            loading="lazy"
            sizes="100%"
            className="rounded-xl object-cover object-center"
          />
        </figure>
      )}

      {gallery.length > 1 ? (
        <div className="flex flex-col">
          {gallery
            ?.filter((_, i) => i > 0)
            .slice(0, 2)
            .map((asset, i) =>
              asset.url.split(".").find((str) => str.includes("mp4")) ? (
                <div
                  key={`gallery_${i}`}
                  className="relative"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  {gallery.length > 3 && i === 1 ? (
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
                    ref={videoRef}
                    muted
                  >
                    <source src={asset.url} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <figure
                  className="relative w-full aspect-[1/.9] mt-4 cursor-pointer"
                  key={`gallery_${i}`}
                  onClick={() => setOpenModal(true)}
                >
                  {gallery.length > 3 && i === 1 ? (
                    <div
                      onClick={() => setOpenModal(true)}
                      className="w-full h-full hover:opacity-100 opacity-0 transition-opacity duration-300 ease-out absolute z-30 flex justify-center items-center bg-black bg-opacity-60 cursor-pointer rounded-xl text-3xl top-0 left-0"
                    >
                      +3
                    </div>
                  ) : null}
                  <Image
                    src={asset?.url}
                    alt="Media"
                    fill
                    priority
                    sizes="100%"
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
          {selectedGalleryModal
            .split(".")
            .find((str) => str.includes("mp4")) ? (
            <div className="relative w-full aspect-[1/.8]">
              <a
                href={selectedGalleryModal}
                target="_blank"
                className="mix-blend-difference font-bold text-xl absolute top-2 z-20 left-2"
              >
                Open in browser
              </a>
              <video controls className="w-full h-full" autoPlay>
                <source src={selectedGalleryModal} type="video/mp4" />
              </video>
            </div>
          ) : (
            <figure className="w-full aspect-[1/.8] relative">
              <Image
                src={selectedGalleryModal}
                alt="Media"
                fill
                priority
                className="object-cover object-center"
              />
              <a
                href={selectedGalleryModal}
                target="_blank"
                className="mix-blend-difference font-bold text-xl absolute bottom-2 left-2"
              >
                Open in browser
              </a>
            </figure>
          )}
          <div className="max-w-full flex gap-2 overflow-y-auto more-gallery">
            {gallery.map((asset, i) =>
              asset.url.split(".").find((str) => str.includes("mp4")) ? (
                <div key={`g_${i}`} className="w-[100px] h-[100px]">
                  <video
                    className="object-center w-full h-full"
                    onClick={() => setSelectedGalleryModal(asset.url)}
                  >
                    <source src={asset.url} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <Image
                  key={`g_${i}`}
                  onClick={() => setSelectedGalleryModal(asset.url)}
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
    </section>
  );
};

export default GalleryMedia;
