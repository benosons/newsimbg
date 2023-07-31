<?php 
namespace App\Models;

use CodeIgniter\Model;

class TokenDataModel extends Model{
    protected $table = 'bank_token';
    protected $primaryKey = 'id_token';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['token', 'id_biller', 'kd_status', 'nm_biller' ,'valid_until'];

    public function getWhereis($where = null)
    {

      $builder = $this->db->table('bank_token');
      $builder->select("bank_token.*");
      $query   = $builder->getWhere($where);
      
      return  $query->getRow();
    }

    public function getWhere($where = null, $param = null)
    {
      
      if($param){
        // $builder = $this->db->table('bank_token');
        // $builder->select("bank_token.*, biller.id_biller as id_user, biller.nm_biller");
        // $builder->join('biller', 'biller.id_biller = bank_token.id_user', 'INNER');
      }else{
        $builder = $this->db->table('bank_token');
        $builder->select("bank_token.*");
      }
      $query   = $builder->getWhere($where);
      echo $this->db->getLastQuery();die;
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

    public function getTokenData($param = null)
    {

        $builder = $this->db->table('bank_token');
        $builder->select("bank_token.*, biller.id_biller as id_biller, biller.nm_biller");
        $builder->join('biller', 'biller.id_biller = bank_token.id_biller', 'INNER');
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

    public function insertTokenData($data = null)
    {
        $res = $this->db->table('bank_token')->insert($data);
        return  $res;
    }

    public function updateTokenData($id = null, $data = null)
    {
      
        $res = $this->db->table('bank_token')->where('id_token', $id)->update($data);
        //  echo $this->db->getLastQuery();die;
        return  $res;
    }

    public function deleteTokenData($id = null)
    {
        $res = $this->db->table('bank_token')->where('id_token', $id)->delete();
        return  $res;
    }

    public function getData($table = null, $id = null)
    {

        $builder = $this->db->table("data_$table");
        $builder->select("*");
        if($id){
          $query  = $builder->getWhere(['id_bank_token' => $id]);
          return $query->getRow();
        }else{
          $query   = $builder->get();
          return $query->getResult();
        }
      
      
      
    }

    public function deleteData($id = null, $table = null)
    {
        $res = $this->db->table("data_$table")->where('id_bank_token', $id)->delete();
        return  $res;
    }

}
