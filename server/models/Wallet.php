<?php

require_once 'DatabaseObject.php';

class Wallet implements DatabaseObject, JsonSerializable
{
    private $id;
    private $name;

    private $errors = [];

    public function validate()
    {
        if (strlen($this->name) == 0) {
            $this->errors['name'] = "Name ungueltig";
            return false;
        }
        unset($this->errors['name']);
        return true;
    }

    public function save()
    {
        if ($this->validate()) {
            if ($this->id != null && $this->id > 0) {
                $this->update();
            } else {
                $this->id = $this->create();
            }
            return true;
        }
        return false;
    }

    public function create()
    {
        $db = Database::connect();
        $stmt = $db->prepare("INSERT INTO wallet (name) VALUES (?)");
        $stmt->execute([$this->name]);
        $lastId = $db->lastInsertId();
        Database::disconnect();
        return $lastId;
    }

    public function update()
    {
        $db = Database::connect();
        $stmt = $db->prepare("UPDATE wallet SET name = ? WHERE id = ?");
        $stmt->execute([$this->name, $this->id]);
        Database::disconnect();
    }

    public static function get($id)
    {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT * FROM wallet WHERE id = ?");
        $stmt->execute([$id]);
        $item = $stmt->fetchObject('Wallet');
        Database::disconnect();
        return $item !== false ? $item : null;
    }

    public static function getAll()
    {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT * FROM wallet ORDER BY name ASC");
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_CLASS, 'Wallet');
        Database::disconnect();
        return $items;
    }

    public static function getPurchases($wallet_id)
    {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT * FROM purchase WHERE wallet_id = ? ORDER BY date DESC");
        $stmt->execute([$wallet_id]);
        $items = $stmt->fetchAll(PDO::FETCH_CLASS, 'Purchase');
        Database::disconnect();
        return $items;
    }

    public static function delete($id)
    {
        $db = Database::connect();
        $stmt = $db->prepare("DELETE FROM wallet WHERE id = ?");
        $stmt->execute([$id]);
        Database::disconnect();
    }

    public function jsonSerialize(): mixed
    {
        return [
            "id"   => intval($this->id),
            "name" => $this->name,
        ];
    }

    public function getId() { return $this->id; }
    public function setId($id) { $this->id = $id; }
    public function getName() { return $this->name; }
    public function setName($name) { $this->name = $name; }
    public function getErrors() { return $this->errors; }
}