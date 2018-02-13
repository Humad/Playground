#include <vector>
#include <string>
#include <algorithm>
#include <gtest/gtest.h>

using std::vector;
using std::string;

struct SSARecord {
  int year;
  std::string name;
  std::string sex;
  int count;

  SSARecord() {};
  // Initialization constructor.
  SSARecord(const int& year,
            const std::string& name,
            const std::string& sex,
            const int& count) :
            year(year),
            name(name),
            sex(sex),
            count(count) {}
};

struct CDCRecord {
  int year;
  int male_expect;
  int female_expect;

  CDCRecord() {};
  // Initialization constructor.
  CDCRecord(const int& year,
            const int& male_expect,
            const int& female_expect) :
            year(year),
            male_expect(male_expect),
            female_expect(female_expect) {}
};

std::vector<CDCRecord> LoadCDCFile(const std::string& filename);

std::vector<SSARecord> LoadSSAFile(const std::string& filename);

vector<SSARecord> YearIs(const vector<SSARecord>& data, const int& year);
vector<SSARecord> YearGT(const vector<SSARecord>& data, const int& year);
vector<SSARecord> YearLT(const vector<SSARecord>& data, const int& year);
vector<SSARecord> OnlyName(const vector<SSARecord>& data, const string& name);
int CountBirthNamesStartingWith(const vector<SSARecord>& data, const char& letter);
int Count(const vector<SSARecord>& data);
void CountBoysAndGirls(const vector<SSARecord>& data, int* boy_count, int* girl_count);
vector<string> GenderNeutralNames(const vector<SSARecord>& data);
bool ExpectedAlive(const vector<CDCRecord>& data, const string& sex, const int& birth_year, const int& current_year);
int EstimatePopulation(const vector<SSARecord>& ssa_data, const vector<CDCRecord>& cdc_data, const int& year);

int CountBirthsInRange(const vector<SSARecord>& data, const int& start_year, const int& end_year);
bool MoreNameInFirstYear(const vector<SSARecord>& data, const string& name, const int& first_year, const int& second_year);
int NamesStartingWithInYear(const vector<SSARecord>& data, const char letter, const int& year);
int StillAlive(const vector<SSARecord>& ssa_data, const vector<CDCRecord>& cdc_data, const int& start_year, const int& final_year);