import { Grid, ImageList, ImageListItem, Button, TextField } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { useState } from "react";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  // other items...
];

const imageuploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageName(event.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("imageName", imageName);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/uploadImage`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Update the itemData array with the new image data
        itemData.unshift({
          img: data.imageUrl,
          title: imageName,
        });
        setSelectedFile(null);
        setImageName("");
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Grid Image">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Image Name"
              value={imageName}
              onChange={(event) => setImageName(event.target.value)}
            />
            <input
              accept="image/*"
              className="hidden"
              id="contained-button-file"
              type="file"
              onChange={handleChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
            <Button variant="outline" color="primary" type="submit">
              Upload
            </Button>
          </form>
          <ImageList
            sx={{ height: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
          >
            {itemData.map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default imageuploader;
