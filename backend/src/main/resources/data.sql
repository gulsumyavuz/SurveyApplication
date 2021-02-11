/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  gulsum.yavuz
 * Created: Oct 28, 2020
 */

DROP TABLE IF EXISTS survey_Topic;
DROP TABLE IF EXISTS survey_Submits;
 
CREATE TABLE survey_Topic (
  id INT PRIMARY KEY,
  topic_Name VARCHAR(250),
  topic_Question VARCHAR(500)
);

CREATE TABLE survey_Submits (
  submit_Id INT PRIMARY KEY,
  topic_Id INT,
  score INT,
  feedback VARCHAR(500)
);
 
