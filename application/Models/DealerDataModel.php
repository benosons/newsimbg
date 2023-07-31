<?php 
namespace App\Models;

use CodeIgniter\Model;

class DealerDataModel extends Model{
    protected $table = 'biller';
    protected $primaryKey = 'id_biller';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['nm_biller', 'alamat', 'kontak', 'create_dtm'];

    public function getWhereis($where = null)
    {

      $builder = $this->db->table('biller');
      $builder->select("biller.*");
      $query   = $builder->getWhere($where);
      
      return  $query->getRow();
    }

    public function getWhere($where = null, $param = null)
    {
      
      if($param){
        $builder = $this->db->table('m_user_simponi');
        $builder->select("m_user_simponi.*, m_provinsi.id as id_provinsi, m_provinsi.provinsi");
        // $builder->join('m_provinsi', 'm_provinsi.id = m_user_simponi.id_provinsi', 'INNER');
      }else{
        $builder = $this->db->table('biller');
        $builder->select("biller.*");
      }
      $query   = $builder->getWhere($where);
     
      return  $query;
    }

    // public function getUsers($param = null)
    // {

    //     $builder = $this->db->table('m_user');
    //     $builder->select("m_user.*, m_role.role");
    //     $builder->join('m_role', 'm_role.id = m_user.id_role', 'INNER');
    //     $query   = $builder->get();
      
    //   // echo $this->db->getLastQuery();
    //   return $query->getResult();
    // }

    public function getDealerData($param = null)
    {

        $builder = $this->db->table('biller');
        $builder->select("biller.*");
        $query   = $builder->get();
      
      // echo $this->db->getLastQuery();
      return $query->getResult();
    }

    // public function getprovinsi($id = null)
    // {
    //   $builder = $this->db->table('m_provinsi');
    //   $builder->select("*");
    //   $builder->orderBy('provinsi', 'ASC');
    //   $builder->where('status <> 0');
    //   $query   = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return $query->getResult();
    // }

    // public function getkabupaten($id = null)
    // {
    //   $builder = $this->db->table('m_kabupaten');
    //   $builder->select("*");
    //   $builder->orderBy('kabupaten', 'ASC');
    //   $builder->where('status <> 0');
    //   $builder->where("id_provinsi = $id");
    //   $query   = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return $query->getResult();
    // }

    // public function getkecamatan($id = null)
    // {
    //   $builder = $this->db->table('m_kecamatan');
    //   $builder->select("*");
    //   $builder->orderBy('kecamatan', 'ASC');
    //   $builder->where('status <> 0');
    //   $builder->where("id_kabupaten = $id");
    //   $query   = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return $query->getResult();
    // }

    // public function getlembaga($id = null)
    // {
    //   $builder = $this->db->table('m_lembaga');
    //   $builder->select("*");
    //   $builder->where('status <> 0');
    //   $query   = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return $query->getResult();
    // }

    // public function getrole($id = null)
    // {
    //   $builder = $this->db->table('m_role');
    //   $builder->select("*");
    //   $builder->where('status <> 0');
    //   $query   = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return $query->getResult();
    // }


    // public function updateIsLogin($id, $data)
    // {
    //   $builder = $this->db->table('m_user');
    //   $query   = $builder->where('id', $id);
    //   $query->update($data);
    //   // echo $this->db->getLastQuery();

    //   return true;
    // }

    public function insertDealerData($data = null)
    {
        $res = $this->db->table('biller')->insert($data);
        
        return  $res;
    }

    public function updateDealerData($id = null, $data = null)
    {
      
        $res = $this->db->table('biller')->where('id_biller', $id)->update($data);
        //  echo $this->db->getLastQuery();die;
        return  $res;
    }

    public function deleteDealerData($id = null)
    {
        $res = $this->db->table('biller')->where('id_biller', $id)->delete();
        return  $res;
    }

    public function getData($table = null, $id = null)
    {

        $builder = $this->db->table("data_$table");
        $builder->select("*");
        if($id){
          $query  = $builder->getWhere(['id_biller' => $id]);
          return $query->getRow();
        }else{
          $query   = $builder->get();
          return $query->getResult();
        }
      
      
      
    }

    public function deleteData($id = null, $table = null)
    {
        $res = $this->db->table("data_$table")->where('id_biller', $id)->delete();
        return  $res;
    }

}
