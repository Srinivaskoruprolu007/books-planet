"use client";
import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

interface ImageKitAuthResponse {
  signature: string;
  expire: number; // Note: "expire" instead of "expiry"
  token: string;
}

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const authenticator = async (): Promise<ImageKitAuthResponse> => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();

    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface FileResponse {
  filePath: string;
  [key: string]: any;
}

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<FileResponse | null>(null);

  const onError = (error: any) => {
    console.error(error);
    toast({
      title: "Image upload failed",
      description: "Your image could not be uploaded. Please try again",
      variant: "destructive",
    });
  };

  const onSuccess = (res: FileResponse) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} is uploaded successfully`,
      variant: "default",
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload"
      />
      <Button
        className="upload-btn bg-transparent"
        onClick={(e) => {
          e.preventDefault();
          ikUploadRef.current?.click();
        }}
      >
        <Image src={"/icons/upload.svg"} alt="upload" width={24} height={24} />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </Button>
      {file && (
        <IKImage
          path={file.filePath}
          alt={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
