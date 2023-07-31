<?php 
namespace App\Models;

use CodeIgniter\Model;

class PaymentDataModel extends Model{
    protected $table = 'transaction';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['invoice', 'customer_id', 'grand_total', 'create_at'];

    public function getWhereis($where = null)
    {

      $builder = $this->db->table('transaction');
      $builder->select("transaction.*");
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
        $builder = $this->db->table('transaction');
        $builder->select("transaction.*");
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

    public function getPaymentData($param = null)
    {

        $builder = $this->db->table('transaction');
        $builder->select("transaction.*");
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

    public function insertPaymentData($data = null)
    {
        $res = $this->db->table('transaction')->insert($data);
        return  $res;
    }

    public function updatePaymentData($id = null, $data = null)
    {
      
        $res = $this->db->table('transaction')->where('id', $id)->update($data);
        //  echo $this->db->getLastQuery();die;
        return  $res;
    }

    public function deletePaymentData($id = null)
    {
        $res = $this->db->table('transaction')->where('id', $id)->delete();
        return  $res;
    }

    public function getData($table = null, $id = null)
    {

        $builder = $this->db->table("data_$table");
        $builder->select("*");
        if($id){
          $query  = $builder->getWhere(['id' => $id]);
          return $query->getRow();
        }else{
          $query   = $builder->get();
          return $query->getResult();
        }
      
      
      
    }

    public function deleteData($id = null, $table = null)
    {
        $res = $this->db->table("data_$table")->where('id', $id)->delete();
        return  $res;
    }

}
