<?php
    header('Access-Control-Allow-Origin: *');
    
    class DocumentView extends Document {
        public function displayDocuments() {
            return $this->fetchDocuments();
        }
    }