import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  sequence: number;
  image_url: string;
  status: 'Active' | 'Inactive';
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [sequence, setSequence] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [file, setFile] = useState<File | null>(null);

  // Fetch categories on page load
  // useEffect(() => {
  //   axios.get('http://localhost:5000/categories').then((response) => setCategories(response.data));
  // }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then((response) => {
      setCategories(response.data);
      setFilteredCategories(response.data); // Initialize filtered categories
    });
  }, []);
  // console.log("category", categories);

  useEffect(() => {
    // Filter categories based on the search query
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, categories]);

  // Function to trigger file input click
  const handleImageClick = () => {
    document.getElementById('fileInput')?.click();
  };

  // Function to handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile || null);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);
    } else {
      setImageUrl('');
    }
  };

  const handleAddCategory = () => {
    setOpen(true);
    setEditCategory(null);
    setName('');
    setSequence(0);
    setImageUrl('');
    setStatus('Active');
    setFile(null);
  };

  const handleEditCategory = (category: Category) => {
    setOpen(true);
    setEditCategory(category);
    setName(category.name);
    setSequence(category.sequence);
    setImageUrl(category.image_url);
    setStatus(category.status);
    setFile(null);
  };

  const handleSaveCategory = () => {
    const newCategory = { name, sequence, image_url: imageUrl, status };

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      axios.post('http://localhost:5000/upload', formData).then((response) => {
        newCategory.image_url = response.data.imageUrl;

        if (editCategory) {
          // Update category
          axios.put(`http://localhost:5000/categories/${editCategory.id}`, newCategory).then(() => {
            setCategories(categories.map((cat) => (cat.id === editCategory.id ? { ...editCategory, ...newCategory } : cat)));
          });
        } else {
          // Add new category
          axios.post('http://localhost:5000/categories', newCategory).then((response) => {
            setCategories([...categories, { ...newCategory, id: response.data.id }]);
          });
        }
        setOpen(false);
      }).catch(error => console.error('Error uploading image:', error));
    } else {
      if (editCategory) {
        // Update category
        axios.put(`http://localhost:5000/categories/${editCategory.id}`, newCategory).then(() => {
          setCategories(categories.map((cat) => (cat.id === editCategory.id ? { ...editCategory, ...newCategory } : cat)));
        });
      } else {
        // Add new category
        axios.post('http://localhost:5000/categories', newCategory).then((response) => {
          setCategories([...categories, { ...newCategory, id: response.data.id }]);
        });
      }
      setOpen(false);
    }
  };

  const handleDeleteCategory = () => {
    if (deleteId !== null) {
      axios.delete(`http://localhost:5000/categories/${deleteId}`).then(() => {
        setCategories(categories.filter((cat) => cat.id !== deleteId));
        setDeleteId(null);
      });
    }
  };

  return (
    <Box p={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" flexDirection="row" justifyContent='center'>
          <img src="/cat.png" alt="Category" style={{ margin: 7, width: 22, height: 22 }} />
          <Typography sx={{marginLeft: '5px'}} variant="h6">Category</Typography>
          <TextField 
            sx={{
              marginLeft: '50px',
              borderRadius: '8px',
              '& .MuiInputBase-root': {
                height: '35px',
                width: '300px',
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                top: '-7px',
                left: '3px',
                '&.MuiInputLabel-shrink': {
                  top: '-1px',
                  left: '-1px'
                },
              },
            }}
            placeholder="Search Category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Button sx={{ height: '40px', width:'135px', border: '1px solid #ddd', backgroundColor: '#5C218B', color: 'white', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}} variant="contained" onClick={handleAddCategory}>Add Category</Button>
      </Box>

      {/* Table to display categories */}
      <Table>
        <TableHead sx={{backgroundColor: '#FFF8B7', margin: '10px'}}>
          <TableRow>
            <TableCell sx={{textAlign: 'center'}}>Id</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Category Name</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Image</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Sequence</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Status</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{backgroundColor: '#F2F2F2', margin: '10px', border: '3px solid #fff'}}>
          {filteredCategories.map((category) => (
            <TableRow sx={{backgroundColor: '#F2F2F2', margin: '10px', border: '3px solid #fff'}} key={category.id}>
              <TableCell sx={{textAlign: 'center'}}>{category.id}</TableCell>
              <TableCell sx={{textAlign: 'center'}}>{category.name}</TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                <img
                  src={`http://localhost:5000${category.image_url}`}
                  alt={category.name}
                  style={{ width: 30, height: 30 }}
                />
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>{category.sequence}</TableCell>
              <TableCell style={{ textAlign: 'center', color: category.status === 'Active' ? '#00A11A' : '#F70505' }}>
                {category.status}
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                <Button onClick={() => handleEditCategory(category)}>
                  <img src="/edit.png" alt="Edit" style={{width: 22, height: 22 }} />
                </Button>
                <Button onClick={() => setDeleteId(category.id)}>
                  <img src="/del.png" alt="Delete" style={{width: 22, height: 22 }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Category Dialog */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="lg"
        >
        <DialogTitle>{editCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
          <TextField 
           sx={{
            margin: '10px',
            borderRadius: '8px',
            '& .MuiInputBase-root': {
              height: '40px',
              width: '300px',
              borderRadius: '8px',
            },
            '& .MuiInputLabel-root': {
              top: '-7px',
              left: '3px',
              '&.MuiInputLabel-shrink': {
                top: '-1px',
                left: '-1px'
              },
            },
          }}
          fullWidth label="Category Name" value={name} onChange={(e) => setName(e.target.value)} margin="dense" />
          <TextField 
           sx={{
            margin: '10px',
            borderRadius: '8px',
            '& .MuiInputBase-root': {
              height: '40px',
              width: '300px',
              borderRadius: '8px',
            },
            '& .MuiInputLabel-root': {
              top: '-7px',
              left: '3px',
              '&.MuiInputLabel-shrink': {
                top: '-1px',
                left: '-1px'
              },
            },
          }}
          fullWidth
          label="Category Sequence" 
          type="number" 
          value={sequence} 
          onChange={(e) => setSequence(Number(e.target.value))} 
          margin="dense" 
          />
          </Box>
          <TextField
             sx={{
              margin: '10px',
              borderRadius: '8px',
              '& .MuiInputBase-root': {
                height: '40px',
                width: '300px',
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                top: '-7px',
                left: '3px',
                '&.MuiInputLabel-shrink': {
                  top: '-1px',
                  left: '-1px'
                },
              },
            }}
            fullWidth
            select
            label="Status"
            SelectProps={{ native: true }}
            value={status}
            onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
            margin="dense"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </TextField>

          <Box
            onClick={handleImageClick}
            sx={{
              border: '1px solid #ddd',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80px',
              width: '80px',
              margin: 3,
            }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" style={{ maxHeight: '100%', maxWidth: '100%' }} />
            ) : (
              <img src="/upload_img.png" alt="Upload" style={{width: 32, height: 32 }} />
            )}
          </Box>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          
        </DialogContent>
        <DialogActions>
          <Button sx={{ height: '40px', width:'100px', border: '1px solid #ddd', color: 'black', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}} onClick={() => setOpen(false)}>Cancel</Button>
          <Button sx={{ height: '40px', width:'100px', border: '1px solid #ddd', backgroundColor: '#5C218B', color: 'white', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}} onClick={handleSaveCategory}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogContent>
          <Box display='flex' flexDirection='row' justifyContent='center' margin='10px'>
            <img src="/dan.png" alt="Upload" style={{width: 32, height: 32 }} />
            <Typography sx={{ fontSize: '23px', fontWeight: 'bold', marginLeft: '10px'}}>Delete</Typography>
          </Box>
          <Typography sx={{ marginTop: '20px'}}>Are you sure you want to delete?</Typography>
        </DialogContent>
        <DialogActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <Button  sx={{ height: '40px', width:'100px', border: '1px solid #ddd', color: 'black', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}} onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button sx={{ height: '40px', width:'100px', border: '1px solid #ddd', backgroundColor: '#5C218B', color: 'white', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}} onClick={handleDeleteCategory}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryPage;
