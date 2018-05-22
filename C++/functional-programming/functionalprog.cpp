#include "assignment6.h"
#include <vector>
#include <iostream>
#include <string>
#include <fstream>
#include <sstream>

using std::cout;
using std::endl;
 

vector<CDCRecord> LoadCDCFile(const string& filename) {
  vector<CDCRecord> cdc_data;
  std::ifstream infile(filename.c_str());
  std::string line;
  while (std::getline(infile, line)) {
      std::stringstream line_stream(line);
      int year, male_expect, female_expect;
      string temp;
      std::getline(line_stream, temp, ',');
      year = std::stoi(temp);
      std::getline(line_stream, temp, ',');
      male_expect = std::stoi(temp);
      std::getline(line_stream, temp, ',');
      female_expect = std::stoi(temp);
      cdc_data.push_back(CDCRecord(year, male_expect, female_expect));
  }
  return cdc_data;
}

vector<SSARecord> LoadSSAFile(const string& filename) {
  vector<SSARecord> ssa_data;
  std::ifstream infile(filename.c_str());
  std::string line;
  while (std::getline(infile, line)) {
      std::stringstream line_stream(line);
      int year, count;
      string sex, name;
      string temp;
      std::getline(line_stream, temp, ',');
      year = atoi(temp.c_str());
      std::getline(line_stream, name, ',');
      std::getline(line_stream, sex, ',');
      std::getline(line_stream, temp, ',');
      count = atoi(temp.c_str());
      SSARecord record(year, name, sex, count);
      ssa_data.push_back(SSARecord(year, name, sex, count));
  }
  return ssa_data;
}

//////////////////////////////////////////////////
/////////////////////////////////////////////////

vector<SSARecord> YearIs(const vector<SSARecord>& data, const int& year) {
  auto isYear = [=] (SSARecord record) {return (record.year == year);};
  int correctYear = count_if(data.begin(), data.end(), isYear);
  int incorrectYear = data.size() - correctYear;
  vector<SSARecord> correctYearList(correctYear);
  vector<SSARecord> incorrectYearList(incorrectYear);
  partition_copy(data.begin(), data.end(), correctYearList.begin(), incorrectYearList.begin(), isYear);
  return correctYearList;
}

vector<SSARecord> YearGT(const vector<SSARecord>& data, const int& year) {
  auto isYearGT = [=] (SSARecord record) {return (record.year > year);};
  int correctCount = count_if(data.begin(), data.end(), isYearGT);
  int incorrectCount = data.size() - correctCount;
  vector<SSARecord> correctList(correctCount);
  vector<SSARecord> incorrectList(incorrectCount);
  partition_copy(data.begin(), data.end(), correctList.begin(), incorrectList.begin(), isYearGT);
  return correctList;
}

vector<SSARecord> YearLT(const vector<SSARecord>& data, const int& year) {
  auto isYearLT = [=] (SSARecord record) {return (record.year < year);};
  int correctCount = count_if(data.begin(), data.end(), isYearLT);
  int incorrectCount = data.size() - correctCount;
  vector<SSARecord> correctList(correctCount);
  vector<SSARecord> incorrectList(incorrectCount);
  partition_copy(data.begin(), data.end(), correctList.begin(), incorrectList.begin(), isYearLT);
  return correctList;
}

vector<SSARecord> OnlyName(const vector<SSARecord>& data, const string& name) {
  auto isEqualName = [=] (SSARecord record) {return (name.compare(record.name) == 0);};
  int correctCount = count_if(data.begin(), data.end(), isEqualName);
  int incorrectCount = data.size() - correctCount;
  vector<SSARecord> correctList(correctCount);
  vector<SSARecord> incorrectList(incorrectCount);
  partition_copy(data.begin(), data.end(), correctList.begin(), incorrectList.begin(), isEqualName);
  return correctList;
}

int CountBirthNamesStartingWith(const vector<SSARecord>& data, const char& letter) {
  auto doesStartWith = [=] (SSARecord record) {return record.name.size() > 0 && record.name.at(0) == letter;};
  int correctCount = count_if(data.begin(), data.end(), doesStartWith);
  return correctCount;
}

int Count(const vector<SSARecord>& data) {
  auto alwaysTrue = [=] (SSARecord record) {return true;};
  int count = count_if(data.begin(), data.end(), alwaysTrue);
  return count;
}

void CountBoysAndGirls(const vector<SSARecord>& data, int* boy_count, int* girl_count) {
  auto isBoy = [=] (SSARecord record) {return (record.sex.compare("M") == 0);};
  auto isGirl = [=] (SSARecord record) {return (record.sex.compare("F") == 0);};
  int boyCount = count_if(data.begin(), data.end(), isBoy);
  int girlCount = count_if(data.begin(), data.end(), isGirl);
  *boy_count = boyCount;
  *girl_count = girlCount;
}

vector<string> GenderNeutralNames(const vector<SSARecord>& data) {
  auto isBoy = [=] (SSARecord record) {return (record.sex.compare("M") == 0);};
  auto isGirl = [=] (SSARecord record) {return (record.sex.compare("F") == 0);};

  int i = 0;
  int j = 0;

  int* boyCount = &i;
  int* girlCount = &j;

  CountBoysAndGirls(data, boyCount, girlCount);

  vector<SSARecord> boys(*boyCount);
  vector<SSARecord> girls(*girlCount);

  partition_copy(data.begin(), data.end(), boys.begin(), girls.begin(), isBoy);

  vector<string> boyNames;
  vector<string> girlNames;
  vector<string> GenderNeutralNames;

  transform(boys.begin(), boys.end(), back_inserter(boyNames), [=] (SSARecord record) {
    return record.name;
  });

  transform(girls.begin(), girls.end(), back_inserter(girlNames), [=] (SSARecord record) {
    return record.name;
  });

  set_intersection(boyNames.begin(), boyNames.end(), girlNames.begin(), girlNames.end(), back_inserter(GenderNeutralNames));

  return GenderNeutralNames;
}

bool ExpectedAlive(const vector<CDCRecord>& data, const string& sex, const int& birth_year, const int& current_year) {
  int age = current_year - birth_year;
  auto it = find_if(data.begin(), data.end(), [=] (CDCRecord record) {return record.year == birth_year;});

  int expected;

  if (sex == "M") {
    expected = it->male_expect;
  } else {
    expected = it->female_expect;
  }

  return age <= expected;
}

int EstimatePopulation(const vector<SSARecord>& ssa_data, const vector<CDCRecord>& cdc_data, const int& year) {
  vector<int> count;
  transform(ssa_data.begin(), ssa_data.end(), back_inserter(count), [=] (SSARecord record) {
    if (ExpectedAlive(cdc_data, record.sex, record.year, year)) {
      return record.count;
    } else {
      return 0;
    }
  });

  int total = accumulate(count.begin(), count.end(), 0);
  return total;
}

/////////////////////////////////
/////////////////////////////////

int CountBirthsInRange(const vector<SSARecord>& data, const int& start_year, const int& end_year) {
  vector<int> count;
  transform(data.begin(), data.end(), back_inserter(count), [=] (SSARecord record) {
    if (record.year >= start_year && record.year <= end_year) {
      return record.count;
    } else {
      return 0;
    }
  });

  int total = accumulate(count.begin(), count.end(), 0);
  return total;
}

bool MoreNameInFirstYear(const vector<SSARecord>& data, const string& name, const int& first_year, const int& second_year) {
  vector<int> firstCount;
  vector<int> secondCount;

  transform(data.begin(), data.end(), back_inserter(firstCount), [=] (SSARecord record) {
    if (record.year == first_year) {
      return record.count;
    } else {
      return 0;
    }
  });

  transform(data.begin(), data.end(), back_inserter(secondCount), [=] (SSARecord record) {
    if (record.year == second_year) {
      return record.count;
    } else {
      return 0;
    }
  });

  int firstTotal = accumulate(firstCount.begin(), firstCount.end(), 0);
  int secondTotal = accumulate(secondCount.begin(), secondCount.end(), 0);
  return firstTotal > secondTotal;
}

int NamesStartingWithInYear(const vector<SSARecord>& data, const char letter, const int& year) {
  vector<int> count;
  transform(data.begin(), data.end(), back_inserter(count), [=] (SSARecord record) {
    if (record.name.at(0) == letter && record.year == year) {
      return record.count;
    } else {
      return 0;
    }
  });

  int total = accumulate(count.begin(), count.end(), 0);
  return total;
}

int StillAlive(const vector<SSARecord>& ssa_data, const vector<CDCRecord>& cdc_data, const int& start_year, const int& final_year) {
  
  int bornCount = count_if(ssa_data.begin(), ssa_data.end(), [=] (SSARecord record) {return record.year >= start_year && record.year <= final_year;});
  vector<SSARecord> bornAfterGivenYear(bornCount);
  vector<SSARecord> x(ssa_data.size() - bornCount);

  partition_copy(ssa_data.begin(), ssa_data.end(), bornAfterGivenYear.begin(), x.begin(), [=] (SSARecord record) {return record.year >= start_year && record.year <= final_year;});

  vector<int> count;

  transform(bornAfterGivenYear.begin(), bornAfterGivenYear.end(), back_inserter(count), [=] (SSARecord record) {
    if (ExpectedAlive(cdc_data, record.sex, record.year, final_year)) {
      return record.count;
    } else {
      return 0;
    }
  });

  int total = accumulate(count.begin(), count.end(), 0);
  return total;
}





