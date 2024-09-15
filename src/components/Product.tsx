import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  subname: string;
  proname: string;
  sequence: number;
  image_url: string;
  status: 'Active' | 'Inactive';
}

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [subname, setSubName] = useState('');
  const [proname, setProName] = useState('');
  const [sequence, setSequence] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [file, setFile] = useState<File | null>(null);


  useEffect(() => {
    axios.get('https://tablesprintbackend.onrender.com/product').then((response) => {
      setProduct(response.data);
      setFilteredProduct(response.data); // Initialize filtered categories
    });
  }, []);
  // console.log("category", categories);

  useEffect(() => {
    // Filter categories based on the search query
    setFilteredProduct(
      product.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, product]);

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

  const handleAddProduct = () => {
    setOpen(true);
    setEditProduct(null);
    setName('');
    setSubName('');
    setProName('');
    setSequence(0);
    setImageUrl('');
    setStatus('Active');
    setFile(null);
  };

  const handleEditProduct= (product: Product) => {
    setOpen(true);
    setEditProduct(product);
    setName(product.name);
    setSubName(product.subname);
    setProName(product.proname);
    setSequence(product.sequence);
    setImageUrl(product.image_url);
    setStatus(product.status);
    setFile(null);
  };

  const handleSaveProduct = () => {
    const newProduct = { proname, subname, name, sequence, image_url: imageUrl, status };

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      axios.post('https://tablesprintbackend.onrender.com/upload', formData).then((response) => {
        newProduct.image_url = response.data.imageUrl;

        if (editProduct) {
          // Update Product
          axios.put(`https://tablesprintbackend.onrender.com/product/${editProduct.id}`, newProduct).then(() => {
            setProduct(product.map((cat) => (cat.id === editProduct.id ? { ...editProduct, ...newProduct } : cat)));
          });
        } else {
          // Add new category
          axios.post('https://tablesprintbackend.onrender.com/product', newProduct).then((response) => {
            setProduct([...product, { ...newProduct, id: response.data.id }]);
          });
        }
        setOpen(false);
      }).catch(error => console.error('Error uploading image:', error));
    } else {
      if (editProduct) {
        // Update category
        axios.put(`https://tablesprintbackend.onrender.com/product/${editProduct.id}`, newProduct).then(() => {
          setProduct(product.map((cat) => (cat.id === editProduct.id ? { ...editProduct, ...newProduct } : cat)));
        });
      } else {
        // Add new category
        axios.post('https://tablesprintbackend.onrender.com/product', newProduct).then((response) => {
          setProduct([...product, { ...newProduct, id: response.data.id }]);
        });
      }
      setOpen(false);
    }
  };

  const handleViewProduct = (product: Product) => {
    setViewProduct(product);
  };

  const handleDeleteProduct = () => {
    if (deleteId !== null) {
      axios.delete(`https://tablesprintbackend.onrender.com/product/${deleteId}`).then(() => {
        setProduct(product.filter((cat) => cat.id !== deleteId));
        setDeleteId(null);
      });
    }
  };

  return (
    <Box p={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" flexDirection="row" justifyContent='center'>
          <img src="/pro.png" alt="Category" style={{ margin: 7, width: 22, height: 22 }} />
          <Typography sx={{marginLeft: '5px'}} variant="h6">Product</Typography>
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
        <Button sx={{ height: '40px', width:'130px', border: '1px solid #ddd', backgroundColor: '#5C218B', color: 'white', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}} variant="contained" onClick={handleAddProduct}>Add Product</Button>
      </Box>

      {/* Table to display categories */}
      <Table>
        <TableHead sx={{backgroundColor: '#FFF8B7', margin: '10px'}}>
          <TableRow>
            <TableCell sx={{textAlign: 'center'}}>Id</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Product Name</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Sub Category Name</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Category Name</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Image</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Sequence</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Status</TableCell>
            <TableCell sx={{textAlign: 'center'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{backgroundColor: '#F2F2F2', margin: '10px', border: '3px solid #fff'}}>
          {filteredProduct.map((product) => (
            <TableRow sx={{backgroundColor: '#F2F2F2', margin: '10px', border: '3px solid #fff'}} key={product.id}>
              <TableCell sx={{textAlign: 'center'}}>{product.id}</TableCell>
              <TableCell sx={{textAlign: 'center'}}>{product.proname}</TableCell>
              <TableCell sx={{textAlign: 'center'}}>{product.subname}</TableCell>
              <TableCell sx={{textAlign: 'center'}}>{product.name}</TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                <img
                  src={`https://tablesprintbackend.onrender.com${product.image_url}`}
                  alt={product.name}
                  style={{ width: 30, height: 30 }}
                />
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>{product.sequence}</TableCell>
              <TableCell style={{ textAlign: 'center', color: product.status === 'Active' ? '#00A11A' : '#F70505' }}>
                {product.status}
              </TableCell>
              <TableCell sx={{textAlign: 'center'}}>
                <Button onClick={() => handleViewProduct(product)}>
                  <img src="/prev.png" alt="Preview" style={{width: 22, height: 22 }} />
                </Button>
                <Button onClick={() => handleEditProduct(product)}>
                  <img src="/edit.png" alt="Edit" style={{width: 22, height: 22 }} />
                </Button>
                <Button onClick={() => setDeleteId(product.id)}>
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
        <DialogTitle>{editProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
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
          fullWidth label="Product Name" value={proname} onChange={(e) => setProName(e.target.value)} margin="dense" />
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
          fullWidth label="Sub Category Name" value={subname} onChange={(e) => setSubName(e.target.value)} margin="dense" />
          
          </Box>
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
            fullWidth
            label="Category Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            margin="dense" 
            />
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
            label="Product Sequence" 
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
          <Button sx={{ height: '40px', width:'100px', border: '1px solid #ddd', backgroundColor: '#5C218B', color: 'white', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}} onClick={handleSaveProduct}>Save</Button>
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
          <Button sx={{ height: '40px', width:'100px', border: '1px solid #ddd', backgroundColor: '#5C218B', color: 'white', borderRadius: '30px', margin: '10px', p: '15px', fontSize: '12px'}} onClick={handleDeleteProduct}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* View Product Dialog */}
      {viewProduct && (
        <Dialog
          open={Boolean(viewProduct)}
          onClose={() => setViewProduct(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            style: {
              borderRadius: '16px',
              padding: '20px',
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'left' }}>
            Product Details
          </DialogTitle>
          <DialogContent>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <Box style={{ width: '300px', margin: '15px' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Product Name:</Typography>
                  <Typography variant="body1" sx={{ marginBottom: '10px' }}>{viewProduct.proname}</Typography>
                </Box>
              <Box style={{ width: '300px', margin: '15px' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sub Category:</Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>{viewProduct.subname}</Typography>
              </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Box style={{ width: '300px', margin: '15px' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Category:</Typography>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>{viewProduct.name}</Typography>
            </Box>
            <Box style={{ width: '300px', margin: '15px' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sequence:</Typography>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>{viewProduct.sequence}</Typography>
            </Box>
            </Box>
            
            
            <Box style={{ width: '40px', margin: '15px' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Status:</Typography>
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>{viewProduct.status}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                height: '40px',
                width: '100px',
                border: '1px solid #ddd',
                color: 'black',
                borderRadius: '30px',
                margin: '10px',
                padding: '10px',
                fontSize: '14px',
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
              onClick={() => setViewProduct(null)}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ProductPage;

