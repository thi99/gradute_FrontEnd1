import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AddCategoryFoodd, getOneCategoryFood } from "../../../api/CategoryFoodsAPI";
import { useParams } from "react-router-dom";
const AddCategoryFood = (props) => {
    const history = useHistory();
    const [createdAt, setcreatedAt] = useState();
    const [btnTile, setBtnTile] = useState("Thêm thể loại");
    const { id } = useParams();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("Sẵn sàng");
    const [description, setDescription] = useState("");
    useEffect(() => {
        const getCategory = async () => {
            try {
                if (id) {
                    const { data } = await getOneCategoryFood(id);
                    setBtnTile("Sửa thể loại");
                    setcreatedAt(data.createdAt);
                    setName(data.name);
                    setStatus(data.status);
                    setDescription(data.description);
                    console.log(data);
                }
            } catch (error) {
                console.log("Error getCategories " + error);
            }
        }
        getCategory();
    }, []);
    const getName = (e) => {
        setName(e.target.value);
    }
    const getStatus = (e) => {
        console.log(e.target.value);
        setStatus(e.target.value);
    }
    const getDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data1 = { id, name, status, description, createdAt };
        const { data } = await AddCategoryFoodd(data1);
        if (id) {
            alert("Sửa thành công thể loại #" + data.id);
        } else {
            alert("Thêm thành công thể loại #" + data.id);
        }
        clearForm();
        const check = window.confirm('Bạn có muốn về trang danh sách không ?');
        if (check) {
            history("/admin/categoryFoods");
        }
    }
    const clearForm = () => {
        setName("");
        setStatus("sẵn sàng");
        setDescription("");
    }

    return (
        <div className="content-page">
            <div className="container-fluid add-form-list">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <div className="header-title">
                                    {!id && <h4 className="card-title">Thêm thể loại</h4>}
                                    {id && <h4 className="card-title">Sửa thể loại</h4>}
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} data-toggle="validator">
                                    <div className="row">
                                        <div className="col-md-12 mt-3">
                                            <div className="form-group">
                                                <label>Tên thể loại</label>
                                                <input type="text" class="form-control" placeHolder="Điền tên thể loại ở đây !" name="name" id="name"
                                                    required onChange={getName} value={name} />
                                                <div className="help-block with-errors">

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3" >
                                            <div className="form-group">
                                                <label>Trạng thái</label>
                                                <select name="status" className="form-control" onChange={getStatus} value={status}>
                                                    <option className="text-success" value="Sẵn sàng">Sẵn sàng</option>
                                                    <option className="text-secondary" value="Ẩn" >Ẩn</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-label-group mb-3 mt-3">
                                            <textarea data-length="20" class="form-control" id="description" rows="3"
                                                placeholder="Mô tả" name="description" onChange={getDescription} value={description}></textarea>
                                            <label>Mô tả</label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary mr-2">{btnTile}</button>
                                    <button type="reset" onClick={clearForm} className="btn btn-danger">Cài lại</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddCategoryFood;
