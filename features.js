/* Filter accross all collumns in table */

$(document).ready(function(){
  $("#search").on("input", function() {
    var value = $(this).val().toLowerCase();
    $("#searchTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

/* Clear filtering */

$(document).on('click', '.clear-filter', function(){       

  var docTable = $('#sorttableDocs').DataTable();
  docTable
   .search( '' )
   .columns().search( '' )
   .draw();

  $('#sorttableDocs').DataTable().searchPanes.clearSelections();
  $('#sorttableDocs').DataTable().order([1, 'asc']).draw();

  var groupTable = $('#sorttableGroups').DataTable();
  groupTable
   .search( '' )
   .columns().search( '' )
   .draw();

  $('#sorttableGroups').DataTable().searchPanes.clearSelections();
  $('#sorttableGroups').DataTable().order([0, 'asc']).draw();

  var groupProj = $('#sorttableProjs').DataTable();
  groupProj
   .search( '' )
   .columns().search( '' )
   .draw();

  $('#sorttableProjs').DataTable().searchPanes.clearSelections();
  $('#sorttableProjs').DataTable().order([0, 'asc']).draw();

  var url= document.location.href;
  window.history.pushState({}, "", url.split("?")[0]);

});

/* DataTable options for sort headers and filtering - Groups*/

$(document).ready(function() {

  var searchOptions = $.fn.dataTable.ext.deepLink( ['search.search' ] );

  var defaultOptions = {
    autoWidth: false,
    paging: false,
    responsive: true,
    buttons: [
      {
        extend: 'searchPanes',
        config:{
          cascadePanes: true,
          emptyMessage:"<i><b>None Defined</b></i>",
          dtOpts: {
            select: {
                style: 'multi'
            }
          }, 
          layout: 'columns-4',
          viewTotal: true,
          columns: [1, 7, 3, 4]
        }
      },
      {
        text: '清除所有过滤项',
        action: function ( e, dt, node, config ) {
          var table = $('#sorttableGroups').DataTable();
          table
           .search( '' )
           .columns().search( '' )
           .draw();

          $('#sorttableGroups').DataTable().searchPanes.clearSelections();
          $('#sorttableGroups').DataTable().order([0, 'asc']).draw();

          var url= document.location.href;
          window.history.pushState({}, "", url.split("?")[0]);
        }
      }
    ],
    columnDefs:[
      {
        width: '16.6%',
        targets:[2]
      },
      {
        width: '20%',
        targets:[6]
      },
      {
        visible: true,
        targets:[7],
        searchPanes: {
          header: "Technical Committee"
        }
      },
      {
        width: '16.6%',
        targets:[8]
      }
    ],
    dom: 
      "<'row'<'col d-print-none d-flex align-items-center'B><'col d-flex justify-content-center align-items-center'i><'col d-print-none d-flex justify-content-end align-items-center'f>>" +
      "<'row'<'col-sm-12't>>",
    language: {
      processing: "加载过滤选项",
      searchPanes: {
        collapse: {0: '过滤选项', _: '过滤选项 (%d)'}
      }
    }
  };

  var dt = $('#sorttableGroups').DataTable( 
    $.extend( defaultOptions, searchOptions )
  );

});

/* DataTable options for sort headers and filtering - Projects*/

$(document).ready(function() {

  var searchOptions = $.fn.dataTable.ext.deepLink( ['search.search' ] );

  var defaultOptions = {
    autoWidth: false,
    paging: false,
    responsive: false,
    buttons: [
      {
        extend: 'searchPanes',
        config:{
          cascadePanes: true,
          emptyMessage:"<i><b>未定义</b></i>",
          dtOpts: {
            select: {
                style: 'multi'
            }
          }, 
          layout: 'columns-5',
          viewTotal: true,
          columns: [8, 2, 0, 6, 10]
        }
      },
      {
        text: '清除所有过滤项',
        action: function ( e, dt, node, config ) {
          var table = $('#sorttableProjs').DataTable();
          table
           .search( '' )
           .columns().search( '' )
           .draw();

          $('#sorttableProjs').DataTable().searchPanes.clearSelections();
          $('#sorttableProjs').DataTable().order([0, 'asc']).draw();

          var url= document.location.href;
          window.history.pushState({}, "", url.split("?")[0]);
        }
      }
    ],
    dom: 
      "<'row'<'col d-print-none d-flex align-items-center'B><'col d-flex justify-content-center align-items-center'i><'col d-print-none d-flex justify-content-end align-items-center'f>>" +
      "<'row'<'col-sm-12't>>",
    language: {
      processing: "加载过滤选项",
      searchPanes: {
        collapse: {0: '过滤选项', _: '过滤选项 (%d)'}
      }
    },
    columnDefs:[
      {
        visible: false,
        targets:[4],
        searchPanes: {
          header: "已批准"
        }
      },
      {
        visible: false,
        targets:[6],
        searchPanes: {
          header: "状态"
        }
      },
      {
        visible: false,
        targets:[8],
        searchPanes: {
          header: "归口"
        }
      },
      {
        visible: false,
        searchPanes: {
          header: "里程碑",
          dtOpts: {
            order: [[1, 'desc']]
          },
          options:[
            {
              label: 'Awaiting ST Objection Disposition Vote (5%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('Awaiting ST Objection Disposition Vote (5%)');
              }
            },
            {
              label: 'Waiting for Group Assignment (15%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('Waiting for Group Assignment (15%)');
              }
            },
            {
              label: 'WG/DG working on WD (20%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('WG/DG working on WD (20%)');
              }
            },
            {
              label: 'WD (22.5%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('WD (22.5%)');
              }
            },
            {
              label: 'CD (25%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('CD (25%)');
              }
            },
            {
              label: 'Pre-FCD Review (30%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('Pre-FCD Review (30%)');
              }
            },
            {
              label: 'Pre-RDD Review (30%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('Pre-RDD Review (30%)');
              }
            },
            {
              label: 'CD Waiting for FCD Ballot (40%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('CD Waiting for FCD Ballot (40%)');
              }
            },
            {
              label: 'CD Waiting for RDD Ballot (40%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('CD Waiting for RDD Ballot (40%)');
              }
            },
            {
              label: 'CD Waiting for Submission to SVP (40%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('CD Waiting for Submission to SVP (40%)');
              }
            },
            {
              label: 'PCD (45%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('PCD (45%)');
              }
            },
            {
              label: 'FCD Ballot (50%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('FCD Ballot (50%)');
              }
            },
            {
              label: 'RDD Ballot (50%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('RDD Ballot (50%)');
              }
            },
            {
              label: 'FCD Ballot Comment Resolution (60%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('FCD Ballot Comment Resolution (60%)');
              }
            },
            {
              label: 'RDD Ballot Comment Resolution (60%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('RDD Ballot Comment Resolution (60%)');
              }
            },
            {
              label: 'FCD (65%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('FCD (65%)');
              }
            },
            {
              label: 'Pre-DP Review (70%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('Pre-DP Review (70%)');
              }
            },
            {
              label: 'RDD (75%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('RDD (75%)');
              }
            },
            {
              label: 'DP Ballot (80%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('DP Ballot (80%)');
              }
            },
            {
              label: 'SVP Review',
              value: function(rowData, rowIdx){
                return rowData[10].includes('SVP Review');
              }
            },
            {
              label: 'DP (85%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('DP (85%)');
              }
            },
            {
              label: 'ST Audit (90%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('ST Audit (90%)');
              }
            },
            {
              label: 'Document in HQ (95%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('Document in HQ (95%)');
              }
            },
            {
              label: 'Published (100%)',
              value: function(rowData, rowIdx){
                return rowData[10].includes('Published (100%)');
              }
            },
            {
              label: 'Uploaded to TC Ref Docs',
              value: function(rowData, rowIdx){
                return rowData[10].includes('Uploaded to TC Ref Docs');
              }
            },
            {
              label: 'Archive',
              value: function(rowData, rowIdx){
                return rowData[10].includes('Archive');
              }
            }
          ]
        },
        targets: [10]
      },
      {
        width: '25%',
        targets: [11]
      },
      {
        width: '16.6%',
        targets: [13]
      }
    ]
  }

  var dt = $('#sorttableProjs').DataTable( 
    $.extend( defaultOptions, searchOptions )
  );

});

/* DataTable options for sort headers and filtering - Documents*/

$(document).ready(function() {

  var searchOptions = $.fn.dataTable.ext.deepLink( ['search.search' ] );

  var defaultOptions = {
    paging: false,
    processing: true,
    responsive: true,
    order: [[1, 'asc']],   
    buttons: [
        {
        extend: 'searchPanes',
        config:{
          cascadePanes: true,
          emptyMessage:"<i><b>未定义</b></i>",
          dtOpts: {
            select: {
                style: 'multi'
            }
          }, 
          layout: 'columns-6',
          viewTotal: true,
          columns: [2, 4, 6, 7, 8, 10]//5, 6, 7, 9]
        }
      },
      {
        text: '清除所有过滤项',
        action: function ( e, dt, node, config ) {
          var table = $('#sorttableDocs').DataTable();
          table
           .search( '' )
           .columns().search( '' )
           .draw();

          $('#sorttableDocs').DataTable().searchPanes.clearSelections();
          $('#sorttableDocs').DataTable().order([1, 'asc']).draw();

          var url= document.location.href;
          window.history.pushState({}, "", url.split("?")[0]);
        }
      }
    ],
    dom: 
      "<'row'<'col d-print-none d-flex align-items-center'B><'col d-flex justify-content-center align-items-center'i><'col d-print-none d-flex justify-content-end align-items-center'f>>" +
      "<'row'<'col-sm-12't>>",
    language: {
      processing: "加载过滤项",
      searchPanes: {
        collapse: {0: '过滤选项', _: '过滤选项 (%d)'}
      }
    },
    columnDefs:[
      {
        visible: false,
        width: '5%',
        targets:[4],
        searchPanes: {
          header: "归口"
        }
      },
      {
        width: '5%',
        targets:[1],
      },      
      {
        width: '5%',
        targets:[2],
      },
      {
        width: '5%',
        targets:[3],
      },            
      {
        width: '5%',
        targets:[5],
      },
      {
        searchPanes: {
          orthogonal: 'sp'
        },
        render: function (data, type, row) {
          if (type === 'sp') {
            var keywords = [];
            $( $(data), "i" ).each(function( index ) {
              var val = $( this ).text();
              val = val.trim();
              if (val.length > 0) {
                keywords.push(val);
              }
            });
            return keywords;
            }
          return data;
        },
        targets:[7]
      },
      {
        searchPanes: {
          options:[
            {
              label: '有效',
              value: function(rowData, rowIdx){
                return rowData[8].includes('[ 有效 ]');
              }
            },
            {
              label: '已修改',
              value: function(rowData, rowIdx){
                return rowData[8].includes('[ 已修改 ]');
              }
            },
            {
              label: '草案',
              value: function(rowData, rowIdx){
                return rowData[8].includes('[ 草案 ]');
              }
            },
            {
              label: '送审稿',
              value: function(rowData, rowIdx){
                return rowData[8].includes('[ 送审稿 ]');
              }
            },
            {
              label: '已重申',
              value: function(rowData, rowIdx){
                return rowData[8].includes('[ 已重申 ]');
              }
            },
            {
              label: '稳定',
              value: function(rowData, rowIdx){
                return rowData[8].includes('[ 稳定 ]');
              }
            },
            {
              label: '被代替',
              value: function(rowData, rowIdx){
                return rowData[8].includes('[ 被代替 ]');
              }
            },
            {
              label: '未知',
              value: function(rowData, rowIdx){
                return rowData[8].includes('[ 未知 ]');
              }
            },
            {
              label: '废止',
              value: function(rowData, rowIdx){
                return rowData[8].includes('[ 废止 ]');
              }
            }
          ]
        },
        targets: [8]
      },
      {
        width: '10%',
        targets: [8]
      },           
      {
        visible: false,
        searchPanes: {
          header: "当前工作",
          orthogonal: 'sp'
        },
        render: function (data, type, row) {
          if (type === 'sp') {
            var currentWork = [];
            $( $(data), "i" ).each(function( index ) {
              var val2 = $( this ).text();

              val2 = val2.trim();
              if (val2.length > 0) {
                currentWork.push(val2);
              }
            });
            return currentWork;
            }
          return data;
        },
        targets:[10]
      }
    ]
  }

  var dt = $('#sorttableDocs').DataTable( 
    $.extend( defaultOptions, searchOptions )
  );

});

/* "Back To Top" button functionality */

$(document).ready(function() {
$(window).scroll(function() {
if ($(this).scrollTop() > 20) {
$('#toTopBtn').fadeIn();
} else {
$('#toTopBtn').fadeOut();
}
});

$('#toTopBtn').click(function() {
$("html, body").animate({
scrollTop: 0
}, 1000);
return false;
});
});