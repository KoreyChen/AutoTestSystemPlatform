#ifndef FULLFORM_H
#define FULLFORM_H

#include <QWidget>
#include "commonform.h"
namespace Ui {
class FullForm;
}

class FullForm : public QWidget
{
    Q_OBJECT

public:
    explicit FullForm(QWidget *parent = 0);
    ~FullForm();

    CommonForm      *F_commonform     ;
private:
    Ui::FullForm *ui;
};

#endif // FULLFORM_H
